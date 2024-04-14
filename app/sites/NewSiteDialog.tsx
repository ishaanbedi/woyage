'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'

const NewSiteDialog = ({ user }: { user: User }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [domainName, setDomainName] = useState('')
    const supabase = createClient()
    const sanitizeDomain = (domain: string) => {
        const withPath = domain.replace(/(^\w+:|^)\/\/(www\.)?/, '').replace(/\/$/, '')
        const withoutPath = withPath.split('/')[0]
        return withoutPath
    }
    const addSite = async () => {
        const domain = sanitizeDomain(domainName)
        const { error } = await supabase.from('site_domains').insert([
            { email: user.email, domain_name: domain }
        ]);
        if (error) {
            console.error('error adding site:', error)
            return
        }
        setIsOpen(false)
        setDomainName('')
    }
    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>
                New Site +
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            New Site
                        </DialogTitle>
                        <DialogDescription>
                            Add a new site and start tracking immediately.
                        </DialogDescription>
                    </DialogHeader>
                    <div >
                        <div>
                            <Label htmlFor="site_domain" className="text-right">
                                Site Domain
                            </Label>
                            <Input id="site_domain" value={domainName} onChange={(e) => setDomainName(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={addSite} disabled={domainName === ''}>
                            Add Site
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default NewSiteDialog;
