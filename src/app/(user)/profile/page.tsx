"use client";

import {
  Card,
  Avatar,
  Button,
  Divider,
  Alert,
} from "@heroui/react";
import { Input } from "@/components/ui/HeroUI";
import { useSession } from "next-auth/react";
import { useState, ChangeEvent } from "react";

export default function UserProfilePage() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulasi update API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <Card>
        <section className="p-6">
          <header className="flex flex-col items-center mb-6">
            <Avatar
              src={session?.user?.image || ""}
              name={session?.user?.name || ""}
              size="lg"
              className="mb-4"
            />
            <h1 className="text-2xl font-bold">
              {session?.user?.name}
            </h1>
            <p className="text-gray-500">{session?.user?.email}</p>
          </header>

          <Divider />

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            {error && (
              <Alert color="danger">
                {error}
              </Alert>
            )}
            {success && (
              <Alert color="success">
                {success}
              </Alert>
            )}

            <Input
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="Your address"
                className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={loading}
              >
                Save Changes
              </Button>
            </div>
          </form>

          <Divider className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">
              Account Security
            </h2>
            <Button
              variant="light"
              fullWidth
            >
              Change Password
            </Button>
          </section>
        </section>
      </Card>
    </main>
  );
}
