import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 border-border">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            This page doesn&apos;t exist. Return to the homepage to view the portfolio.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex text-sm font-medium text-primary hover:underline"
          >
            Back to homepage
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
