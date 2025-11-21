"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface InterviewContextType {
  hasResponses: boolean;
  setHasResponses: (value: boolean) => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export function InterviewProvider({ children }: { children: ReactNode }) {
  const [hasResponses, setHasResponses] = useState(false);

  return (
    <InterviewContext.Provider value={{ hasResponses, setHasResponses }}>
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterviewContext() {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterviewContext must be used within InterviewProvider");
  }
  return context;
}
