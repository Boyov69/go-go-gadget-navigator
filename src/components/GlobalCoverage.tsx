
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Country {
  code: string;
  name: string;
  cities: number;
  flag: string;
}

const GlobalCoverage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const countries: Country[] = [
    { code: "be", name: "Belgium", cities: 12, flag: "🇧🇪" },
    { code: "fr", name: "France", cities: 45, flag: "🇫🇷" },
    { code: "de", name: "Germany", cities: 38, flag: "🇩🇪" },
    { code: "it", name: "Italy", cities: 32, flag: "🇮🇹" },
    { code: "nl", name: "Netherlands", cities: 15, flag: "🇳🇱" },
    { code: "es", name: "Spain", cities: 28, flag: "🇪🇸" },
    { code: "uk", name: "United Kingdom", cities: 33, flag: "🇬🇧" },
    { code: "us", name: "United States", cities: 65, flag: "🇺🇸" },
  ];
  
  const filteredCountries = searchQuery.trim() === "" 
    ? countries 
    : countries.filter(country => 
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold flex items-center">
          <Globe className="h-5 w-5 mr-2 text-primary" />
          Global Coverage
        </h3>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search countries..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {filteredCountries.map((country) => (
            <div key={country.code} className="border rounded-md p-3">
              <div className="flex items-center">
                <span className="text-xl mr-2">{country.flag}</span>
                <div>
                  <h4 className="font-medium">{country.name}</h4>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="text-xs">
                      {country.cities} cities
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          Available in 45+ countries worldwide with 24/7 support
        </p>
      </CardContent>
    </Card>
  );
};

export default GlobalCoverage;
