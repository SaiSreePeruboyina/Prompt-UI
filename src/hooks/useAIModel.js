"use client";

import { useState, useEffect } from "react";

export const useAIModel = () => {
  const [modelType, setModelType] = useState("openai");
  const [apiKey, setApiKey] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Load model settings from localStorage
    const savedModel = localStorage.getItem("aiModel");
    if (savedModel) {
      setModelType(savedModel);
      
      // Load the API key for this model
      const savedApiKey = localStorage.getItem(`${savedModel}ApiKey`);
      if (savedApiKey) {
        setApiKey(savedApiKey);
        setIsConfigured(true);
      }
    }
  }, []);

  const updateModelSettings = (model, key) => {
    setModelType(model);
    setApiKey(key);
    setIsConfigured(!!key);
    
    // Save to localStorage
    localStorage.setItem("aiModel", model);
    localStorage.setItem(`${model}ApiKey`, key);
  };

  return {
    modelType,
    apiKey,
    isConfigured,
    updateModelSettings,
  };
};
