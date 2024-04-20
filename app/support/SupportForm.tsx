"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
export default function SupportForm() {
  const supabase = createClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query_type, setQueryType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const submitForm = async () => {
    setLoading(true);
    if (!name || !email || !query_type || !message) {
      toast.error("Please fill out all fields");
      setLoading(false);
      return;
    }
    const { error } = await supabase
      .from("contacts")
      .insert([{ name, email, query_type, message }]);
    if (error) {
      setLoading(false);
      toast.error("An error occurred while submitting the form");
      return;
    }
    toast.success("Form submitted successfully");
    setName("");
    setEmail("");
    setQueryType("");
    setMessage("");
    setLoading(false);
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Contact {process.env.NEXT_PUBLIC_SITE_NAME}
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below and we will get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  required
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="query-type">Query Type</Label>
              <Select required value={query_type} onValueChange={setQueryType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select query type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="issue">Issue</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="feature-request">
                    Feature Request
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
