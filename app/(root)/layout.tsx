import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";

export const metadata = {
  title: "Threads",
  description:"Threads clone by Rajat using nextjs ,tailwind ,typescript , clerk etc"
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter} bg-dark-1`}>
          <Topbar />

          <section >
            <LeftSidebar/>
              <section className="main-container">
                <div className="w-full max-w-4xl">
                  {children}
                </div>
              </section>
            <RightSidebar />
          </section>

          <Bottombar />
          
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
