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
import { EyeOpenIcon, TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

const SitesList = ({ user }: { user: User }) => {
    const [sites, setSites] = useState<{ domain_name: string }[]>([])
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
                                        <Button>
                                            <EyeOpenIcon />
                                        </Button>
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