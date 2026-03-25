import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { useState } from "react";
import { getStudentData } from "@/lib/api";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";

export default function StudentDataPortal() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState<"id" | "phone">("id");
  const [searchValue, setSearchValue] = useState("");
  const [studentData, setStudentData] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchValue.trim()) {
      Swal.fire({
        icon: "warning",
        title: "حقل مفقود",
        text: "يرجى إدخال البيانات المطلوبة",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await getStudentData(
        searchType === "id" ? searchValue : undefined,
        searchType === "phone" ? searchValue : undefined
      );

      if (response.success && response.data) {
        setStudentData(response.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "لم يتم العثور على البيانات",
          text: response.error || "لا توجد بيانات للطالب المطلوب",
        });
        setStudentData(null);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "حدث خطأ في الاتصال بالخادم",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm mb-8">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-900">بوابة بيانات الطالب</h1>
          <Button variant="outline" onClick={() => setLocation("/")} className="gap-2">
            <i className="fas fa-home"></i>
            الرئيسية
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Search Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>البحث عن بيانات الطالب</CardTitle>
              <CardDescription>
                ابحث باستخدام رقم الهوية أو رقم جوال ولي الأمر
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="id"
                      checked={searchType === "id"}
                      onChange={(e) => setSearchType(e.target.value as "id" | "phone")}
                    />
                    <span>البحث برقم الهوية</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="phone"
                      checked={searchType === "phone"}
                      onChange={(e) => setSearchType(e.target.value as "id" | "phone")}
                    />
                    <span>البحث برقم جوال ولي الأمر</span>
                  </label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="searchValue">
                    {searchType === "id" ? "رقم الهوية" : "رقم الجوال"}
                  </Label>
                  <Input
                    id="searchValue"
                    placeholder={searchType === "id" ? "أدخل رقم الهوية" : "أدخل رقم الجوال"}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full gap-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "جاري البحث..." : "بحث"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Student Data Display */}
          {studentData && (
            <Card>
              <CardHeader>
                <CardTitle>بيانات الطالب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Student Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">بيانات الطالب</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">الاسم الرباعي</p>
                      <p className="font-semibold text-gray-900">{studentData.studentName}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">رقم الهوية</p>
                      <p className="font-semibold text-gray-900">{studentData.studentId}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">رقم الجوال</p>
                      <p className="font-semibold text-gray-900">{studentData.studentPhone}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">تاريخ الميلاد</p>
                      <p className="font-semibold text-gray-900">{studentData.studentBirthDate}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">العنوان</p>
                      <p className="font-semibold text-gray-900">{studentData.studentAddress}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">المرحلة الدراسية</p>
                      <p className="font-semibold text-gray-900">{studentData.studentLevel}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">الصف الدراسي</p>
                      <p className="font-semibold text-gray-900">{studentData.studentGrade}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">الحلقة</p>
                      <p className="font-semibold text-gray-900">{studentData.circle || "لم يتم التحديد"}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">مجموع الحفظ</p>
                      <p className="font-semibold text-gray-900">{studentData.memorized || "0"} جزء</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">حالة الطالب</p>
                      <p className="font-semibold text-gray-900">{studentData.status}</p>
                    </div>
                  </div>
                </div>

                {/* Guardian Info */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">بيانات ولي الأمر</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">الاسم الرباعي</p>
                      <p className="font-semibold text-gray-900">{studentData.guardianName}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">رقم الجوال</p>
                      <p className="font-semibold text-gray-900">{studentData.guardianPhone}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">رقم الهوية</p>
                      <p className="font-semibold text-gray-900">{studentData.guardianId}</p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-3">
                      <p className="text-sm text-gray-600">الصلة</p>
                      <p className="font-semibold text-gray-900">{studentData.guardianRelationship}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  <Button variant="outline" onClick={() => setLocation("/")} className="flex-1">
                    العودة للرئيسية
                  </Button>
                  <Button onClick={() => setSearchValue("")} variant="secondary" className="flex-1">
                    بحث جديد
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
