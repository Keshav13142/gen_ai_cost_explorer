import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function ModelNotFound() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <AlertCircle className="w-6 h-6 mr-2 text-destructive" />
            Model Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            We're sorry, but the AI model you're looking for could not be found
            in our system.
          </p>
          <p className="text-sm text-muted-foreground">
            This could be due to a mistyped URL, an outdated link, or the model
            may have been removed from our database.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Models List
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
