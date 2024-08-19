"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from 'next/navigation'


export default function Component() {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([
    {
      name: "John Doe",
      rating: 4,
      text: "This product is amazing! Highly recommended.",
      date: "2023-06-01",
    },
    {
      name: "Jane Smith",
      rating: 5,
      text: "I love this product, it exceeded my expectations!",
      date: "2023-05-15",
    },
    {
      name: "Bob Johnson",
      rating: 3,
      text: "The product is okay, but I expected more for the price.",
      date: "2023-04-20",
    },
  ]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    text: "",
  });

  const {productId} = useParams();
  // console.log("ProductId: ", productId);

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [productId]);

  const handleReviewChange = (field, value) => {
    setNewReview({
      ...newReview,
      [field]: value,
    });
  };

  const handleSubmitReview = () => {
    if (newReview.name && newReview.rating && newReview.text) {
      setReviews([
        ...reviews,
        {
          ...newReview,
          date: new Date().toISOString().slice(0, 10),
        },
      ]);
      setNewReview({
        name: "",
        rating: 0,
        text: "",
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-10 items-start">
        <img
          src={product.imageUrl}
          alt={product.name}
          width={600}
          height={900}
          className="aspect-[2/3] object-cover border w-full rounded-lg overflow-hidden"
        />
        <div className="grid gap-2">
          <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              {[...Array(Math.max(0, Math.min(5, product.rating || 0)))].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 fill-primary" />
              ))}
              {[...Array(5 - Math.max(0, Math.min(5, product.rating || 0)))].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 fill-muted stroke-muted-foreground" />
              ))}
            </div>
            <span className="text-muted-foreground">(32 reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Sold by:</span>
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              {product.sellername}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Shop:</span>
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              {product.shopname}
            </Link>
          </div>
          <div className="text-4xl font-bold">₹{product.price}</div>
          <Button size="lg">Add to Cart</Button>
        </div>
      </div>
      <div className="grid gap-6 md:gap-10">
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={newReview.name}
                  onChange={(e) => handleReviewChange("name", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rating">Rating</Label>
                <Select
                  id="rating"
                  value={newReview.rating}
                  onValueChange={(e) => handleReviewChange("rating", parseInt(e.target.value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 star</SelectItem>
                    <SelectItem value="2">2 stars</SelectItem>
                    <SelectItem value="3">3 stars</SelectItem>
                    <SelectItem value="4">4 stars</SelectItem>
                    <SelectItem value="5">5 stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="text">Review</Label>
                <Textarea
                  id="text"
                  value={newReview.text}
                  onChange={(e) => handleReviewChange("text", e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              <Button size="lg" onClick={handleSubmitReview}>
                Submit Review
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {reviews.map((review, index) => (
                <div key={index} className="grid gap-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(Math.max(0, Math.min(5, review.rating || 0)))].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 fill-primary" />
                      ))}
                      {[...Array(5 - Math.max(0, Math.min(5, review.rating || 0)))].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      ))}
                    </div>
                    <span className="text-muted-foreground">
                      {review.name} - {review.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StarIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }