import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Calculator, CircleAlert, DollarSign, InfoIcon } from "lucide-react";
import { useMemo, useState } from "react";
import type { Model } from "../data/schema";
import {
    calculateCost,
    getAvailableCostMethods,
    type CostMethod,
} from "../data/utils";

const DEFAULT_INPUT_UNITS = 100;
const DEFAULT_OUTPUT_UNITS = 500;
const DEFAULT_API_CALLS = 100;

const ModelCostCalculator = ({ model }: { model: Model }) => {
    const [inputUnits, setInputUnits] = useState<number>(DEFAULT_INPUT_UNITS);
    const [outputUnits, setOutputUnits] = useState<number>(DEFAULT_OUTPUT_UNITS);
    const [apiCalls, setApiCalls] = useState<number>(DEFAULT_API_CALLS);

    const availableMethods = useMemo(
        () => getAvailableCostMethods(model),
        [model]
    );

    const [selectedMethod, setSelectedMethod] = useState<CostMethod | undefined>(
        availableMethods[0]
    );

    const hasInputCost = useMemo(
        () => selectedMethod && !!model[`input_cost_per_${selectedMethod}`],
        [selectedMethod, model]
    );
    const hasOutputCost = useMemo(
        () => selectedMethod && !!model[`output_cost_per_${selectedMethod}`],
        [selectedMethod, model]
    );

    if (availableMethods.length === 0)
        return (
            <Alert>
                <CircleAlert className="h-4 w-4" />
                <AlertTitle>Calculator not available</AlertTitle>
                <AlertDescription>
                    No cost information was found for model "{model.model_name}"
                </AlertDescription>
            </Alert>
        );

    const costs = calculateCost(model, inputUnits, outputUnits, selectedMethod);
    const totalCost = costs.inputCost + costs.outputCost;

    return (
        <Card>
            <CardHeader className="pb-5">
                <CardTitle className="text-lg font-semibold flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Cost Calculator
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cost-method">Calculate By</Label>
                            <Select
                                defaultValue={availableMethods[0]}
                                onValueChange={(value) => {
                                    setSelectedMethod(value as CostMethod);
                                    setInputUnits(DEFAULT_API_CALLS);
                                    setOutputUnits(DEFAULT_OUTPUT_UNITS);
                                }}
                            >
                                <SelectTrigger id="cost-method">
                                    <SelectValue placeholder="Select cost method" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableMethods.map((method) => (
                                        <SelectItem key={method} value={method}>
                                            {method
                                                .split("_")
                                                .map(
                                                    (word) => word.charAt(0).toUpperCase() + word.slice(1)
                                                )
                                                .join(" ")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label
                                htmlFor="input-units"
                                className={cn(
                                    "text-sm font-medium",
                                    !hasInputCost && selectedMethod && "text-muted-foreground"
                                )}
                            >
                                Input Units{" "}
                                {!hasInputCost && selectedMethod && "(data unavailable)"}
                            </Label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <Input
                                    id="input-units"
                                    type="number"
                                    min="0"
                                    value={inputUnits.toString()}
                                    onChange={(e) => setInputUnits(Number(e.target.value))}
                                    disabled={!hasInputCost}
                                />
                            </div>
                        </div>
                        <div>
                            <Label
                                htmlFor="output-units"
                                className={cn(
                                    "text-sm font-medium",
                                    !hasOutputCost && selectedMethod && "text-muted-foreground"
                                )}
                            >
                                Output Units{" "}
                                {!hasOutputCost && selectedMethod && "(data unavailable)"}
                            </Label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <Input
                                    id="output-units"
                                    type="number"
                                    min="0"
                                    value={outputUnits.toString()}
                                    onChange={(e) => setOutputUnits(Number(e.target.value))}
                                    disabled={!hasOutputCost}
                                />
                            </div>
                        </div>
                        <div>
                            <Label
                                htmlFor="api-calls"
                                className={cn(
                                    "text-sm font-medium",
                                    !selectedMethod && "text-muted-foreground"
                                )}
                            >
                                Api Calls
                            </Label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <Input
                                    id="api-calls"
                                    type="number"
                                    min="0"
                                    value={apiCalls.toString()}
                                    onChange={(e) => setApiCalls(Number(e.target.value))}
                                    disabled={!selectedMethod}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <p className="text-sm font-medium mb-1">Input Cost</p>
                            <div className="text-xl font-bold flex items-center">
                                <DollarSign className="h-6 w-6 mr-1" />
                                {costs.inputCost.toFixed(6)}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium mb-1">Output Cost</p>
                            <div className="text-xl font-bold flex items-center">
                                <DollarSign className="h-6 w-6 mr-1" />
                                {costs.outputCost.toFixed(6)}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium mb-1">Price per API call</p>
                            <div className="text-xl font-bold flex items-center">
                                <DollarSign className="h-6 w-6 mr-1" />
                                {totalCost.toFixed(6)}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium mb-1">Estimated Total Cost</p>
                            <div className="text-xl font-bold flex items-center">
                                <DollarSign className="h-6 w-6 mr-1" />
                                {(totalCost * apiCalls).toFixed(6)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground flex items-center">
                    <InfoIcon className="w-4 h-4 mr-1" />
                    This is an estimate based on the provided token counts and may not
                    reflect the actual cost.
                </div>
            </CardContent>
        </Card>
    );
};

export default ModelCostCalculator;