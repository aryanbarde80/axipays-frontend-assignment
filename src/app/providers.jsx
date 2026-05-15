import { Toaster } from "react-hot-toast";

export function AppProviders({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "18px",
            padding: "14px 16px",
            background: "#111827",
            color: "#f8fafc"
          }
        }}
      />
    </>
  );
}
