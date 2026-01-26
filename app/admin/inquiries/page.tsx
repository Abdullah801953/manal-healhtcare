"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, Trash2, Eye, Loader2, FileText, 
  Phone, Mail, MapPin, Calendar, Download 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InquiriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const url = statusFilter === 'all' 
        ? '/api/inquiries' 
        : `/api/inquiries?status=${statusFilter}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setInquiries(data.data);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.id) return;

    try {
      setDeleting(true);
      const response = await fetch(`/api/inquiries/${deleteDialog.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setInquiries(inquiries.filter((i) => i._id !== deleteDialog.id));
        setDeleteDialog({ open: false, id: null });
      } else {
        alert(data.error || "Failed to delete inquiry");
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      alert("Failed to delete inquiry");
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setInquiries(inquiries.map(i => 
          i._id === id ? { ...i, status: newStatus } : i
        ));
        if (selectedInquiry && selectedInquiry._id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) =>
    inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inquiry.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inquiry.phone.includes(searchQuery) ||
    inquiry.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'in-progress': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleExport = () => {
    const csv = inquiries.map(i => ({
      Name: i.name,
      Email: i.email || 'N/A',
      Phone: i.phone,
      Country: i.country,
      'Medical Condition': i.medicalCondition,
      'Medical Report': i.medicalReport ? 'Yes' : 'No',
      Status: i.status,
      Date: new Date(i.createdAt).toLocaleString()
    }));
    
    const csvString = [
      Object.keys(csv[0]).join(','),
      ...csv.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const newCount = inquiries.filter((i) => i.status === "new").length;
  const contactedCount = inquiries.filter((i) => i.status === "contacted").length;
  const inProgressCount = inquiries.filter((i) => i.status === "in-progress").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-gray-600 mt-1">Manage patient inquiries from query form</p>
        </div>
        <Button variant="outline" onClick={handleExport} disabled={inquiries.length === 0}>
          <Download className="w-4 h-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="cursor-pointer" onClick={() => setStatusFilter("all")}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{inquiries.length}</div>
            <div className="text-sm text-gray-600">Total Inquiries</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer" onClick={() => setStatusFilter("new")}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{newCount}</div>
            <div className="text-sm text-gray-600">New</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer" onClick={() => setStatusFilter("contacted")}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{contactedCount}</div>
            <div className="text-sm text-gray-600">Contacted</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer" onClick={() => setStatusFilter("in-progress")}>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{inProgressCount}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search inquiries by name, email, phone, or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={statusFilter === "new" ? "default" : "outline"}
                onClick={() => setStatusFilter("new")}
                size="sm"
              >
                New
              </Button>
              <Button
                variant={statusFilter === "contacted" ? "default" : "outline"}
                onClick={() => setStatusFilter("contacted")}
                size="sm"
              >
                Contacted
              </Button>
              <Button
                variant={statusFilter === "in-progress" ? "default" : "outline"}
                onClick={() => setStatusFilter("in-progress")}
                size="sm"
              >
                In Progress
              </Button>
              <Button
                variant={statusFilter === "completed" ? "default" : "outline"}
                onClick={() => setStatusFilter("completed")}
                size="sm"
              >
                Completed
              </Button>
              <Button
                variant={statusFilter === "cancelled" ? "default" : "outline"}
                onClick={() => setStatusFilter("cancelled")}
                size="sm"
              >
                Cancelled
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredInquiries.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No inquiries found</h3>
            <p className="text-gray-600">
              {searchQuery ? "Try adjusting your search query" : "Patient inquiries will appear here"}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Inquiries List */}
      {!loading && filteredInquiries.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {filteredInquiries.map((inquiry) => (
            <Card
              key={inquiry._id}
              className={`hover:shadow-md transition-shadow`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      inquiry.status === "new" ? "bg-blue-100" : 
                      inquiry.status === "contacted" ? "bg-yellow-100" :
                      inquiry.status === "in-progress" ? "bg-purple-100" :
                      inquiry.status === "completed" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <FileText className={`w-5 h-5 ${
                      inquiry.status === "new" ? "text-blue-600" : 
                      inquiry.status === "contacted" ? "text-yellow-600" :
                      inquiry.status === "in-progress" ? "text-purple-600" :
                      inquiry.status === "completed" ? "text-green-600" : "text-red-600"
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{inquiry.name}</h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(inquiry.status)}`}>
                            {inquiry.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {inquiry.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-4 h-4" />
                              {inquiry.email}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            {inquiry.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {inquiry.country}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {formatDate(inquiry.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 mb-4">
                      <h4 className="font-medium text-gray-900 mb-1">Medical Condition:</h4>
                      <p className="text-sm text-gray-700">{inquiry.medicalCondition}</p>
                      {inquiry.medicalReport && (
                        <div className="mt-2">
                          <a 
                            href={inquiry.medicalReport} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <Download className="w-4 h-4" />
                            View Medical Report
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Status Selector */}
                    <div className="mb-4">
                      <Select
                        value={inquiry.status}
                        onValueChange={(value) => handleStatusChange(inquiry._id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Change Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedInquiry(inquiry);
                          setViewDialog(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        WhatsApp
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => setDeleteDialog({ open: true, id: inquiry._id })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* View Details Dialog */}
      <Dialog open={viewDialog} onOpenChange={setViewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>Full details of the patient inquiry</DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700">Name</h4>
                  <p className="text-gray-900">{selectedInquiry.name}</p>
                </div>
                {selectedInquiry.email && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700">Email</h4>
                    <p className="text-gray-900">{selectedInquiry.email}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-sm text-gray-700">Phone</h4>
                  <p className="text-gray-900">{selectedInquiry.phone}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700">Country</h4>
                  <p className="text-gray-900">{selectedInquiry.country}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700">Status</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(selectedInquiry.status)}`}>
                    {selectedInquiry.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700">Date</h4>
                  <p className="text-gray-900">{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Medical Condition</h4>
                <p className="text-gray-900 bg-gray-50 p-3 rounded">{selectedInquiry.medicalCondition}</p>
              </div>
              {selectedInquiry.medicalReport && (
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Medical Report</h4>
                  <a 
                    href={selectedInquiry.medicalReport} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <Download className="w-4 h-4" />
                    View/Download Report
                  </a>
                </div>
              )}
              {selectedInquiry.notes && (
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Notes</h4>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded">{selectedInquiry.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, id: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Inquiry</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this inquiry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialog({ open: false, id: null })}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
