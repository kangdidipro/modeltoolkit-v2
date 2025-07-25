import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee } from "lucide-react";

export default function CoffeePage() {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <div className="inline-block p-4 bg-primary/10 rounded-full">
          <Coffee className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold font-headline">Support Model Toolkit</h1>
        <p className="text-xl text-muted-foreground">
          If you find this toolkit useful, please consider supporting its development.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Your Support Matters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Model Toolkit is a passion project dedicated to providing free and accessible strategic tools for everyone. Your contribution helps cover server costs, maintenance, and allows for the development of new features and models.
          </p>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="TMRGSQG6D7ZM4" />
            <input type="hidden" name="currency_code" value="USD" />
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Buy Now" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
