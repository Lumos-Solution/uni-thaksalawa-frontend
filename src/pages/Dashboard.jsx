import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const progressData = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 35 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 25 },
  { name: "Fri", value: 20 },
  { name: "Sat", value: 15 },
  { name: "Sun", value: 10 },
];

const Dashboard = () => {
  return (
      <div className="min-h-screen bg-white text-gray-800">
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 text-center bg-gray-100">
            <CardContent className="py-10">
              <Button variant="outline" className="text-lg">Create a Post +</Button>
            </CardContent>
          </Card>

          <Card className="text-center bg-green-100">
            <CardContent className="py-8">
              <div className="text-sm">class</div>
              <div className="text-2xl font-semibold">2</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-green-100">
            <CardContent className="py-8">
              <div className="text-sm">Enrollments</div>
              <div className="text-2xl font-semibold">2</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-green-100">
            <CardContent className="py-8">
              <div className="text-sm">class</div>
              <div className="text-2xl font-semibold">2</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-green-100">
            <CardContent className="py-8">
              <div className="text-sm">class</div>
              <div className="text-2xl font-semibold">2</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-blue-100 col-span-1 md:col-span-2">
            <CardContent className="p-4">
              <div className="text-lg font-medium mb-2">Progress</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={progressData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1 text-center border-dashed border-2 border-blue-300">
            <CardContent className="py-10 text-gray-500 text-xl">up comming</CardContent>
          </Card>
        </div>

        <footer className="text-center text-sm py-4 bg-gray-100 text-gray-600">
          © 2025 UniThaksalawa. All rights reserved
        </footer>
      </div>
  );
};

export default Dashboard;
