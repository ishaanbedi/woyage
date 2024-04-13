'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeOpenIcon, TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

const SitesList = ({ user }: { user: User }) => {
    const [sites, setSites] = useState<{ domain_name: string }[]>([])
    const [updatedSiteDomain, setUpdatedSiteDomain] = useState('')
    const supabase = createClient()
    const fetchSites = async () => {
        const { data, error } = await supabase.from('site_domains').select().eq('email', user.email);
        if (error) {
            console.error('error fetching sites:', error)
            return
        }
        setSites(data)
    }
    const deleteSite = async (domain: string) => {
        const { error } = await supabase.from('site_domains').delete().eq('domain_name', domain);
        if (error) {
            console.error('error deleting site:', error)
            return
        }
        fetchSites()
    }
    const sanitizeDomain = (domain: string) => {
        const withPath = domain.replace(/(^\w+:|^)\/\/(www\.)?/, '').replace(/\/$/, '')
        const withoutPath = withPath.split('/')[0]
        return withoutPath
    }
    const updateSite = async () => {
        const domain = sanitizeDomain(updatedSiteDomain)
        const { error } = await supabase.from('site_domains').update({ domain_name: domain }).eq('domain_name', sites[0].domain_name);
        if (error) {
            console.error('error updating site:', error)
            return
        }
        setUpdatedSiteDomain('')
        fetchSites()
    }
    useEffect(() => {
        fetchSites()
    }, [user])
    supabase
        .channel('site_domains')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'site_domains' }, fetchSites)
        .subscribe()
    return (
        <section>
            {sites.length === 0 ? (
                <p>No sites added yet.</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Domain</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sites.map((site: { domain_name: string }, index: number) => (
                            <TableRow>
                                <TableCell className="font-medium">
                                    {site.domain_name}
                                </TableCell>
                                <TableCell>
                                    <div className='flex space-x-2'>
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button>
                                                    <EyeOpenIcon />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        {site.domain_name}
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <div className='flex flex-col space-y-2'>
                                                    <span>
                                                        <Label htmlFor="siteID">Site ID</Label>
                                                        <Input type="text" id="siteID" value={site.website_id} readOnly disabled />
                                                    </span>
                                                    <span>
                                                        <Label htmlFor="domain">Domain</Label>
                                                        <Input type="text" id="domain" placeholder={site.domain_name} value={updatedSiteDomain} onChange={(e) => setUpdatedSiteDomain(e.target.value)} />
                                                    </span>
                                                    <span>
                                                        <Button disabled={!updatedSiteDomain} onClick={updateSite}>
                                                            Update
                                                        </Button>
                                                    </span>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <Button>
                                                    <TrashIcon />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the site.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => deleteSite(site.domain_name)}>Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </section>
    );
}

export default SitesList;