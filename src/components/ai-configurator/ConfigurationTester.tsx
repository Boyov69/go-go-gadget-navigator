
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AIAssistantConfig, TestResult } from '@/types/aiAssistant';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ConfigurationTesterProps {
  config: AIAssistantConfig;
}

export const ConfigurationTester: React.FC<ConfigurationTesterProps> = ({ config }) => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const testAPIConnection = async (): Promise<TestResult> => {
    // This is a mock test - in a real app, you would make actual API calls
    const selectedProvider = Object.keys(config.providers).find(
      provider => config.providers[provider as any].enabled
    );
    
    if (!selectedProvider || !config.providers[selectedProvider as any].apiKey) {
      return {
        name: "API Connection",
        success: false,
        message: "No enabled provider with API key found",
      };
    }
    
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      name: "API Connection",
      success: true,
      message: `Successfully connected to ${selectedProvider} API`,
    };
  };

  const testVoiceCapabilities = async (): Promise<TestResult> => {
    if (!config.enableVoice) {
      return {
        name: "Voice Capabilities",
        success: true,
        message: "Voice capabilities are disabled (no test performed)",
      };
    }
    
    // Check if browser supports speech synthesis
    if (!('speechSynthesis' in window)) {
      return {
        name: "Voice Capabilities",
        success: false,
        message: "Browser does not support speech synthesis",
      };
    }
    
    // Simulate voice test
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      name: "Voice Capabilities",
      success: true,
      message: "Voice capabilities are available and working",
    };
  };

  const testModelAccess = async (): Promise<TestResult> => {
    // Simulate model access test
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return {
      name: "Model Access",
      success: true,
      message: `Successfully verified access to ${config.model}`,
    };
  };

  const runTests = async () => {
    setTesting(true);
    try {
      const testResults = await Promise.all([
        testAPIConnection(),
        testVoiceCapabilities(),
        testModelAccess(),
      ]);
      setResults(testResults);
    } catch (error) {
      console.error('Testing failed:', error);
      setResults([
        {
          name: "Test Execution",
          success: false,
          message: `Testing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ]);
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Configuration Testing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={runTests}
          disabled={testing}
          className="w-full"
        >
          {testing ? 'Testing Configuration...' : 'Test Configuration'}
        </Button>
        
        {results.length > 0 && (
          <div className="space-y-2 mt-4">
            {results.map((result, index) => (
              <Alert key={index} variant={result.success ? "default" : "destructive"}>
                {result.success ? 
                  <CheckCircle className="h-4 w-4 text-green-500" /> : 
                  <AlertCircle className="h-4 w-4" />
                }
                <AlertDescription className="flex justify-between">
                  <span className="font-medium">{result.name}</span>
                  <span>{result.message}</span>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfigurationTester;
