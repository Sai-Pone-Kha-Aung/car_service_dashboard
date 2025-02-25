'use client'

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ChevronLeft, Save, Trash2, Upload } from 'lucide-react'
import { blogData } from "@/constants/Data"
import ImageUpload from "@/components/share_components/image_upload"

export default function AdminBlogEditPage() {
    const { id } = useParams();
    const blogID = Number(id);
    const router = useRouter()
    const [image, setImage] = useState<{ [key: string]: string | number | File }>({});
    const [data, setData] = useState<BlogData[]>([]);
    const [uploadImage, setUploadImage] = useState({ image: `data:image/jpeg;base64,${Buffer.isBuffer(data[0]?.image) ? data[0]?.image?.toString('base64') : ''}` });
    const [updateBlog, setUpdateBlog] = useState<BlogData[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/blog/${id}`)
            const jsonData = await response.json()
            const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData]
            setData(dataArray)

            setUploadImage({ image: `data:image/jpeg;base64,${Buffer.from(dataArray[0]?.image.data || '').toString('base64')}` });
        } catch (error) {
            console.error("Fail to fetch", error)
        }
    }


    useEffect(() => {
        fetchData();
    }, [])

    console.log(typeof data)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data[0].title,
                    tags: data[0].tags,
                    category: data[0].category,
                    content: data[0].content
                }),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setData([updatedData]);
                console.log("Blog post saved successfully");
            } else {
                const errorData = await response.json();
                console.error("Failed to save blog post:", errorData.error);
            }
        } catch (error) {
            console.error("Error saving blog post:", error);
        }
        console.log("Blog post saved")
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/blog`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: blogID }),
            });

            if (response.ok) {
                console.log("Blog post deleted successfully");
                router.push("/admin/blog");
            } else {
                const errorData = await response.json();
                console.error("Failed to delete blog post:", errorData.error);
            }
        } catch (error) {
            console.error("Error deleting blog post:", error);
        }
    }


    const handleChange = async (id: string, value: string | number | File) => {
        setImage(prev => ({ ...prev, [id]: value }))
        if (typeof File !== 'undefined' && value instanceof File) {
            const uploadUrl = await changeImage(value);
            if (uploadUrl) {
                setUploadImage(prev => ({ ...prev, image: uploadUrl }));
            }
        }
    }

    const changeImage = async (file: File): Promise<string | null> => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch(`/api/blog/${id}`, {
                method: 'PATCH',
                body: formData,
            });

            if (response.ok) {
                // After upload, refetch blog data to get the updated image
                const blogResponse = await fetch(`/api/blog/${id}`);
                const updatedData = await blogResponse.json();
                setData([updatedData]); // Update state with the new blog data
                return updatedData.image; // Return the image URL from the server
            } else {
                console.error("Failed to upload image");
                return null;
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setData(prevData => {
            const updatedData = [...prevData];
            updatedData[0] = { ...updatedData[0], [id]: value };
            return updatedData;
        });
    };

    const handleSelectChange = (value: string) => {
        setData(prevData => {
            const updatedData = [...prevData];
            updatedData[0] = { ...updatedData[0], category: value };
            return updatedData;
        });
    };

    console.log("image", uploadImage.image)

    return (
        <div className="bg-gray-100">
            {/* Main Content */}
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
                            {data.map((blog) => (
                                <CardContent className="space-y-6" key={blog.id}>
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input id="title" placeholder="Enter blog post title" defaultValue={blog.title} onChange={handleInputChange} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        {/* <Select value={blog.category} defaultValue={blog.category} onValueChange={handleSelectChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Car Maintenance">Car Maintenance</SelectItem>
                                                <SelectItem value="auto-repair">Auto Repair</SelectItem>
                                                <SelectItem value="car-tips">Car Tips</SelectItem>
                                                <SelectItem value="Electric Vehicles">Electric Vehicles</SelectItem>
                                            </SelectContent>
                                        </Select> */}
                                        <Input id="category" placeholder="Enter blog category" defaultValue={blog.category} onChange={handleInputChange} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="featured-image">Featured Image</Label>
                                        <div className="flex items-center space-x-4">
                                            <Image
                                                src={data?.[0].image}
                                                alt="Featured"
                                                width={400}
                                                height={400}
                                                className="object-cover rounded"
                                                key={uploadImage.image}
                                            />
                                            <ImageUpload fieldId="image" onChange={handleChange} />
                                            <div>

                                                <Button type="button" variant="outline"
                                                    onClick={() => document.getElementById(`file-input-image`)?.click()}
                                                >
                                                    <Upload className="mr-2 h-4 w-4" /> Upload  Image
                                                </Button>
                                            </div>
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
                                                defaultValue={blog.content}
                                                onChange={handleInputChange}
                                            />
                                        </TabsContent>
                                        <TabsContent value="preview">
                                            <div className="prose max-w-none">
                                                <h1>{blog.title}</h1>
                                                <p>{blog.content}</p>
                                            </div>
                                        </TabsContent>
                                    </Tabs>

                                    <div className="space-y-2">
                                        <Label htmlFor="tags">Tags</Label>
                                        <Input id="tags" placeholder="Enter tags separated by commas" defaultValue={blog.tags} onChange={handleInputChange} />
                                    </div>
                                </CardContent>
                            ))}

                            <CardFooter className="flex justify-between">
                                <Button type="button" variant="destructive" onClick={() => handleDelete()}>
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete Post
                                </Button>
                                <Button type="submit" onClick={handleSubmit}>
                                    <Save className="mr-2 h-4 w-4" /> Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </main>
        </div>

    )
}