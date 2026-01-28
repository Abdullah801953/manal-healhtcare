"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash2, Eye, Users, Loader2 } from "lucide-react";
import Link from "next/link";

interface Doctor {
  _id: string;
  slug: string;
  name: string;
  designation: string;
  hospital: string;
  experience: string;
  experienceYears: string;
  specialization: string[];
  status: string;
  image?: string;
}

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch doctors from API
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/doctors');
      const data = await response.json();
      
      if (data.success) {
        setDoctors(data.data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedDoctors.length === filteredDoctors.length) {
      setSelectedDoctors([]);
    } else {
      setSelectedDoctors(filteredDoctors.map(d => d._id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedDoctors.includes(id)) {
      setSelectedDoctors(selectedDoctors.filter(dId => dId !== id));
    } else {
      setSelectedDoctors([...selectedDoctors, id]);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDoctorToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!doctorToDelete) return;

    try {
      setDeleting(true);
      const response = await fetch(`/api/doctors/${doctorToDelete}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await fetchDoctors();
        setDeleteDialogOpen(false);
        setDoctorToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedDoctors.length === 0) return;

    if (!confirm(`Are you sure you want to delete ${selectedDoctors.length} doctor(s)?`)) {
      return;
    }

    try {
      const response = await fetch('/api/doctors', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedDoctors }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchDoctors();
        setSelectedDoctors([]);
      }
    } catch (error) {
      console.error('Error deleting doctors:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Doctor</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this doctor? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={deleting}>
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Doctors Management</h1>
              <p className="text-gray-600">Add, edit, or remove doctor profiles</p>
            </div>
          </div>
        </div>
        <Link href="/admin/doctors/new">
          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all rounded-full">
            <Plus className="w-4 h-4 mr-2" />
            Add New Doctor
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 rounded-3xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Doctors</p>
                <p className="text-2xl font-bold text-blue-900">{doctors.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 rounded-3xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Active</p>
                <p className="text-2xl font-bold text-green-900">{doctors.filter(d => d.status === 'active').length}</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 rounded-3xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Selected</p>
                <p className="text-2xl font-bold text-purple-900">{selectedDoctors.length}</p>
              </div>
              <div className="text-purple-600 text-sm">items</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-md rounded-3xl">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="🔍 Search by doctor name or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 border-2 focus:border-green-500 rounded-full"
              />
            </div>
            <Button variant="outline" className="border-2 hover:border-green-500 hover:bg-green-50 rounded-full">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z\" />
              </svg>
              Filter
            </Button>
            {selectedDoctors.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={handleBulkDelete}
                className="shadow-lg hover:shadow-xl transition-all rounded-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete {selectedDoctors.length} Selected
              </Button>
            )}
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Showing {filteredDoctors.length} results for &quot;{searchQuery}&quot;
            </p>
          )}
        </CardContent>
      </Card>

      {/* Doctors List */}
      <Card className="shadow-lg rounded-3xl">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">👨‍⚕️ All Doctors</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                {filteredDoctors.length}
              </span>
            </CardTitle>
            {selectedDoctors.length > 0 && (
              <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                ✓ {selectedDoctors.length} selected
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="text-center py-16 px-4">
              <Loader2 className="w-10 h-10 text-green-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading doctors...</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Doctors Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                {searchQuery 
                  ? `No doctors match "${searchQuery}". Try adjusting your search.`
                  : "Start by adding your first doctor to the system."
                }
              </p>
              <Link href="/admin/doctors/new">
                <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Doctor
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    <input 
                      type="checkbox" 
                      checked={selectedDoctors.length === filteredDoctors.length && filteredDoctors.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Doctor</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 hidden md:table-cell">Hospital</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 hidden lg:table-cell">Experience</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 hidden lg:table-cell">Specialization</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <input 
                        type="checkbox" 
                        checked={selectedDoctors.includes(doctor._id)}
                        onChange={() => toggleSelect(doctor._id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {doctor.image ? (
                          <img 
                            src={doctor.image} 
                            alt={doctor.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                            {doctor.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{doctor.name}</p>
                          <p className="text-sm text-gray-600">{doctor.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <p className="text-sm text-gray-700">{doctor.hospital}</p>
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                        {doctor.experienceYears} years
                      </span>
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell">
                      <p className="text-sm text-gray-700 line-clamp-1">
                        {Array.isArray(doctor.specialization) 
                          ? doctor.specialization.join(', ') 
                          : doctor.specialization}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                        {doctor.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/doctors/${doctor.slug}`} target="_blank">
                          <Button variant="ghost" size="sm" title="View">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/doctors/${doctor._id}/edit`}>
                          <Button variant="ghost" size="sm" title="Edit">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700 hover:bg-red-50" 
                          title="Delete"
                          onClick={() => handleDeleteClick(doctor._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
          {filteredDoctors.length > 0 && (
            <div className="border-t bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Showing {filteredDoctors.length} of {doctors.length} doctors</span>
                </div>
                <div className="text-xs text-gray-500">
                  💡 Tip: Select multiple doctors to perform bulk actions
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
        