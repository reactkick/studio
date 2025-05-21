"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Lightbulb, FileCode, Brain, ExternalLink, Info } from "lucide-react";
import { summarizeReplitProject, type SummarizeReplitProjectInput, type SummarizeReplitProjectOutput } from "@/ai/flows/summarize-replit";
import { detectTechStack } from "@/lib/tech-detector";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  replitUrl: z.string().url({ message: "Please enter a valid Replit URL (e.g., https://replit.com/@username/projectname)." }),
  fileContents: z.string().min(50, { message: "File content must be at least 50 characters." }).max(50000, {message: "File content must be less than 50000 characters."}),
});

type FormValues = z.infer<typeof formSchema>;

export function ReplitExplorerClient() {
  const [summary, setSummary] = useState<string | null>(null);
  const [techStack, setTechStack] = useState<string | null>(null);
  const [pastedContent, setPastedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      replitUrl: "",
      fileContents: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setSummary(null);
    setTechStack(null);
    setPastedContent(data.fileContents);

    try {
      const aiInput: SummarizeReplitProjectInput = {
        replitUrl: data.replitUrl,
        fileContents: data.fileContents,
      };
      const aiResult: SummarizeReplitProjectOutput = await summarizeReplitProject(aiInput);
      setSummary(aiResult.summary);

      const detectedStack = detectTechStack(data.fileContents);
      setTechStack(detectedStack);

      toast({
        title: "Analysis Complete",
        description: "Summary and tech stack generated successfully.",
      });

    } catch (error) {
      console.error("Error processing Replit data:", error);
      setSummary("Error generating summary. Please check the console for details or try again.");
      setTechStack("Error detecting tech stack.");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text inline-block">
          Replit Explorer
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Paste your Replit project's URL and main code file content to get an AI-powered summary and tech stack detection.
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Input Column */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <ExternalLink className="h-6 w-6 text-primary" />
                  Project Details
                </CardTitle>
                <CardDescription>Provide the Replit URL and the content of its main code file.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="replitUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Replit URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://replit.com/@username/projectname" {...field} className="text-base" />
                      </FormControl>
                      <FormDescription>
                        The public URL of the Replit project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fileContents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">File Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste the content of your main Replit file here (e.g., index.js, main.py)..."
                          {...field}
                          className="min-h-[250px] text-sm font-mono resize-y"
                          aria-label="File Content Input"
                        />
                      </FormControl>
                      <FormDescription>
                        Paste the code from the primary file of your Replit project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-5 w-5" />
                       Summarize & Detect
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Output Column */}
            <div className="space-y-8">
              {pastedContent && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Info className="h-6 w-6 text-accent" />
                      Pasted Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-muted/50">
                      <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                        <code>{pastedContent}</code>
                      </pre>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}

              {(summary || techStack || isLoading) && (summary !== "Error generating summary. Please check the console for details or try again.") && (
                 <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Lightbulb className="h-6 w-6 text-primary" />
                      AI Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading && !summary ? (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Generating summary...</span>
                      </div>
                    ) : summary ? (
                      <ScrollArea className="h-auto max-h-[200px] w-full">
                         <p className="text-base leading-relaxed whitespace-pre-line">{summary}</p>
                      </ScrollArea>
                    ) : null}
                  </CardContent>
                </Card>
              )}

              {(techStack || isLoading) && (techStack !== "Error detecting tech stack.") && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <FileCode className="h-6 w-6 text-accent" />
                      Detected Tech Stack
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading && !techStack ? (
                       <div className="flex items-center space-x-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Detecting tech stack...</span>
                      </div>
                    ) : techStack ? (
                      <p className="text-xl font-semibold">{techStack}</p>
                    ) : null}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
