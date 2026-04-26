import { notFound } from "next/navigation";

export const metadata = {
  title: "Support",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SupportPage() {
  notFound();
}
