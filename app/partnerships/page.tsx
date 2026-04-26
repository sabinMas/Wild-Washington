import { notFound } from "next/navigation";

export const metadata = {
  title: "Partnerships",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PartnershipsPage() {
  notFound();
}
