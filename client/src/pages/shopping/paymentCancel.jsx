import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentCancelPage() {
    const navigate = useNavigate();

    return (
        <Card className="p-10">
            <CardHeader className="p-0">
                <CardTitle className="text-4xl">Payment is cancelled!</CardTitle>
            </CardHeader>
            <Button className="mt-5" onClick={() => navigate("/shop/home")}>
                Go to home
            </Button>
        </Card>
    );
}

export default PaymentCancelPage;