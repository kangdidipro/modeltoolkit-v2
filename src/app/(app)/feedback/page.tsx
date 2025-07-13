"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"


const feedbackFormSchema = z.object({
  easeOfUse: z.string().optional(),
  usefulness: z.string().optional(),
  design: z.string().optional(),
  comments: z.string().min(10, {
    message: "Comments must be at least 10 characters.",
  }).max(500, {
    message: "Comments must not be longer than 500 characters."
  }),
})

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>

export default function FeedbackPage() {
  const { toast } = useToast()

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      comments: "",
    },
  })

  function onSubmit(data: FeedbackFormValues) {
    console.log("Feedback submitted:", data)
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your valuable input. We appreciate you helping us improve.",
    })
    form.reset()
  }

  const ratingOptions = [
    { value: "1", label: "Very Poor" },
    { value: "2", label: "Poor" },
    { value: "3", label: "Average" },
    { value: "4", label: "Good" },
    { value: "5", label: "Excellent" },
  ]

  return (
    <Card className="max-w-3xl mx-auto">
        <CardHeader>
            <CardTitle className="font-headline text-3xl">Share Your Feedback</CardTitle>
            <CardDescription>We are constantly working to improve Model Toolkit. Your feedback is invaluable to us.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="easeOfUse"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>How would you rate the ease of use?</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6"
                                >
                                {ratingOptions.map(option => (
                                    <FormItem key={`ease-${option.value}`} className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={option.value} />
                                        </FormControl>
                                        <Label className="font-normal">{option.label}</Label>
                                    </FormItem>
                                ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="usefulness"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>How would you rate the usefulness of the models?</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6"
                                >
                                {ratingOptions.map(option => (
                                    <FormItem key={`useful-${option.value}`} className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={option.value} />
                                        </FormControl>
                                        <Label className="font-normal">{option.label}</Label>
                                    </FormItem>
                                ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="design"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>How would you rate the overall design?</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6"
                                >
                                {ratingOptions.map(option => (
                                    <FormItem key={`design-${option.value}`} className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={option.value} />
                                        </FormControl>
                                        <Label className="font-normal">{option.label}</Label>
                                    </FormItem>
                                ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="comments"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Additional Comments</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Tell us more about your experience, or any suggestions you have..."
                                className="resize-y min-h-[100px]"
                                {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Please share any other thoughts or ideas for improvement.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Submit Feedback</Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}
