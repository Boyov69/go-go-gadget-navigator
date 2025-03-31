
import { useToast } from "@/hooks/use-toast";
import { TripProvider } from "./tripProviders";

export function useTripProviders() {
  const { toast } = useToast();
  
  const handleSelectProvider = (provider: TripProvider) => {
    toast({
      title: "Provider Selected",
      description: `You've selected ${provider.name} at €${provider.price.toFixed(2)}`,
      duration: 3000,
    });
  };
  
  return { handleSelectProvider };
}
