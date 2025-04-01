
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, SupportedLanguage } from "@/contexts/LanguageContext";

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, availableLanguages, t } = useLanguage();

  const current = availableLanguages.find(lang => lang.code === language) || availableLanguages[0];

  const handleLanguageChange = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{current.flag} {current.name}</span>
          <span className="sm:hidden">{current.flag}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center justify-between"
          >
            <span>
              {lang.flag} {lang.name}
            </span>
            {language === lang.code && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
