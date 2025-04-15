'use client'

import React, { useState } from "react"
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
import ImageUpload from "@/components/share_components/image_upload"
import { set } from "date-fns"

export default function AdminBlogAddPage() {
    const router = useRouter()
    const [data, setData] = useState<BlogData[]>([])
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState("")
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState<{ [key: string]: string | number | File }>({});
    const [uploadImage, setUploadImage] = useState({ image: `data:image/jpeg;base64,${Buffer.isBuffer(data[0]?.image) ? data[0]?.image?.toString('base64') : ''}` });
    const [blogId, setBlogId] = useState<string | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("tags", tags);
        formData.append("category", category);
        formData.append("content", content);
        if (image.image) {
            formData.append("image", image.image as File);
        }

        try {
            const response = await fetch("/api/blog", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const newBlog = await response.json();
                console.log("Blog post created successfully:", newBlog);
                router.push("/admin/blog"); // Redirect after success
            } else {
                const errorData = await response.json();
                console.error("Failed to create blog post:", errorData.error);
            }
        } catch (error) {
            console.error("Error creating blog post:", error);
        }
    };

    const handleImageUpload = async (id: string) => {
        try {
            const formData = new FormData();
            formData.append('image', image.image as File);

            const response = await fetch(`/api/blog/${id}`, {
                method: 'PATCH',
                body: formData,
            });

            if (response.ok) {
                const updatedBlog = await response.json();
                setUploadImage({ image: updatedBlog.image });
                console.log("Image uploaded successfully");
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }

    // const handleChange = async (id: string, value: string | number | File) => {
    //     setImage(prev => ({ ...prev, [id]: value }))
    //     if (typeof File !== 'undefined' && value instanceof File) {
    //         if (blogId) {
    //             await handleImageUpload(blogId);
    //         }
    //     }
    // }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage({ image: file });
            setPreviewImage(URL.createObjectURL(file)); // Local preview before upload
        }
    };

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
                                    <Input id="title" placeholder="Enter blog post title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input id="category" placeholder="Enter blog category" value={category} onChange={(e) => setCategory(e.target.value)} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="featured-image">Featured Image</Label>
                                    <div className="flex items-center space-x-4">
                                        {/* {ImageUpload({
                                            fieldId: 'featured-image',
                                            onChange: handleChange,
                                        })} */}
                                        <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                                        {previewImage && (<Image
                                            src={previewImage}
                                            alt="Featured"
                                            width={400}
                                            height={400}
                                            className="object-cover rounded"
                                        />)}
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
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        />
                                    </TabsContent>
                                    <TabsContent value="preview">
                                        <div className="prose max-w-none">
                                            <h1>{title}</h1>
                                            <p>{content}</p>
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags</Label>
                                    <Input id="tags" placeholder="Enter tags separated by commas" value={tags} onChange={(e) => setTags(e.target.value)} />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button type="submit" onClick={handleSubmit}>
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