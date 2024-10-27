// useBlog.js
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../ config";

export const useBlog = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then((response) => {
            setBlogs(response.data.blogs);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        });
    }, []);

    return { loading, blogs }; // return both loading and blogs
};


export const useBlogId = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState(null); // Store a single blog object

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then((response) => {
            setBlog(response.data.blog); // Assuming the response contains a single blog object
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching blog:", error);
            setLoading(false);
        });
    }, [id]);

    return { loading, blog }; // Return a single blog object
};
