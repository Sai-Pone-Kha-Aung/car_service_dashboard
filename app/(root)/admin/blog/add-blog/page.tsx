'use client'

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Save, Trash2, Upload } from 'lucide-react'
import { blogData } from "@/constants/Data"
import Image from "next/image"

export default function AdminBlogEditPage() {
    const router = useRouter()
    const [date, setDate] = React.useState<Date>()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        // Here you would typically save the blog post data
        console.log("Blog post saved")
        router.push("/admin/blog")
    }

    const handleDelete = () => {
        // Here you would typically delete the blog post
        console.log("Blog post deleted")
        router.push("/admin/blog")
    }

    return (
        <div className="bg-gray-100">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex items-center justify-start mb-6">
                        <Button variant="outline" onClick={() => router.push("/admin/blog")}>
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog List
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Blog Post Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" placeholder="Enter blog post title" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent >
                                            <SelectItem value="car-maintenance">Car Maintenance</SelectItem>
                                            <SelectItem value="auto-repair">Auto Repair</SelectItem>
                                            <SelectItem value="car-tips">Car Tips</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="featured-image">Featured Image</Label>
                                    <div className="flex items-center space-x-4">
                                        <Image
                                            src="/placeholder.jpg"
                                            alt="Featured"
                                            width={96}
                                            height={96}
                                            className="object-cover rounded"
                                        />
                                        <Button type="button" variant="outline">
                                            <Upload className="mr-2 h-4 w-4" /> Upload New Image
                                        </Button>
                                    </div>
                                </div>

                                <Tabs defaultValue="write">
                                    <TabsList>
                                        <TabsTrigger value="write">Write</TabsTrigger>
                                        <TabsTrigger value="preview">Preview</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="write" className="space-y-2">
                                        <Label htmlFor="content">Content</Label>
                                        <Textarea
                                            id="content"
                                            placeholder="Write your blog post content here..."
                                            className="min-h-[300px]"
                                            required
                                        />
                                    </TabsContent>
                                    <TabsContent value="preview">
                                        <div className="prose max-w-none">
                                            <h1>Blog Post Title</h1>
                                            <p>This is a preview of your blog post content. It will be rendered here as you type in the Write tab.</p>
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags</Label>
                                    <Input id="tags" placeholder="Enter tags separated by commas" />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button type="submit">
                                    <Save className="mr-2 h-4 w-4" /> Publish Post
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </main>
        </div>

    )
}