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
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Create Post */}
          <Card className="col-span-1 text-center shadow-md bg-white border border-gray-200 hover:shadow-lg transition">
            <CardContent className="py-10">
              <Button variant="outline" className="text-lg">Create a Post +</Button>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="text-center bg-gradient-to-r from-green-200 to-green-100 shadow-md">
            <CardContent className="py-8">
              <div className="text-sm font-medium text-gray-600">Classes</div>
              <div className="text-3xl font-bold text-green-800">2</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-r from-blue-200 to-blue-100 shadow-md">
            <CardContent className="py-8">
              <div className="text-sm font-medium text-gray-600">Enrollments</div>
              <div className="text-3xl font-bold text-blue-800">2</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-r from-yellow-200 to-yellow-100 shadow-md">
            <CardContent className="py-8">
              <div className="text-sm font-medium text-gray-600">Courses</div>
              <div className="text-3xl font-bold text-yellow-800">2</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-r from-purple-200 to-purple-100 shadow-md">
            <CardContent className="py-8">
              <div className="text-sm font-medium text-gray-600">Sessions</div>
              <div className="text-3xl font-bold text-purple-800">2</div>
            </CardContent>
          </Card>

          {/* Progress Chart */}
          <Card className="col-span-1 md:col-span-2 bg-white shadow-md">
            <CardContent className="p-6">
              <div className="text-lg font-semibold text-gray-700 mb-4">Weekly Progress</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={progressData}>
                  <XAxis dataKey="name" stroke="#555" />
                  <YAxis stroke="#555" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Upcoming */}
          <Card className="col-span-1 text-center border-dashed border-2 border-blue-300 bg-white text-blue-600 shadow-sm hover:shadow-md transition">
            <CardContent className="py-10 text-xl font-medium">Upcoming</CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm py-4 mt-10 bg-gray-100 text-gray-500 border-t border-gray-200">
          © 2025 UniThaksalawa. All rights reserved.
        </footer>
      </div>
  );
};

export default Dashboard;
