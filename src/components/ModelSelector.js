"use client";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ModelSelector = ({ onModelSelect, currentModel = "openai", currentApiKey = "" }) => {
  const [model, setModel] = useState(currentModel);
  const [apiKey, setApiKey] = useState(currentApiKey);
  const { toast } = useToast();

  const handleSave = () => {
    if (!apiKey) {
      toast({
        variant: "destructive",
        title: "API Key Required",
        description: "Please enter your API key to continue",
      });
      return;
    }

    onModelSelect(model, apiKey);

    toast({
      title: "Settings Saved",
      description: `Now using ${model === "openai" ? "OpenAI" : "Groq"} model`,
    });

    // Save to localStorage for persistence
    localStorage.setItem("aiModel", model);
    localStorage.setItem(`${model}ApiKey`, apiKey);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">AI Model Settings</h3>
        <p className="text-sm text-gray-400">
          Select which AI model to use for generation
        </p>
      </div>

      <RadioGroup
        value={model}
        onValueChange={(value) => setModel(value)}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="openai" id="openai" />
          <Label htmlFor="openai" className="text-white cursor-pointer">
            OpenAI
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="groq" id="groq" />
          <Label htmlFor="groq" className="text-white cursor-pointer">
            Groq
          </Label>
        </div>
      </RadioGroup>

      <div className="space-y-2">
        <Label htmlFor="apiKey" className="text-white">
          {model === "openai" ? "OpenAI" : "Groq"} API Key
        </Label>
        <Input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={`Enter your ${model === "openai" ? "OpenAI" : "Groq"} API key`}
          className="bg-promptui-light border-promptui-light text-white"
        />
        <p className="text-xs text-gray-400">
          Your API key is stored locally in your browser and never sent to our servers
        </p>
      </div>

      <Button
        onClick={handleSave}
        className="w-full bg-promptui-primary hover:bg-promptui-primary/90"
      >
        Save Settings
      </Button>
    </div>
  );
};

export default ModelSelector;
