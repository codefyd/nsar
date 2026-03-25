import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import { useState } from "react";
import { registerStudent } from "@/lib/api";
import { APP_CONSTANTS, VALIDATION_RULES } from "@/lib/config";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";

export default function StudentRegistration() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    studentPhone: "",
    studentBirthDate: "",
    studentAddress: "",
    studentLevel: "",
    studentGrade: "",
    guardianName: "",
    guardianPhone: "",
    guardianId: "",
    guardianRelationship: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLevelChange = (value: string) => {
    setSelectedLevel(value);
    setFormData(prev => ({
      ...prev,
      studentLevel: value,
      studentGrade: "", // Reset grade when level changes
    }));
  };

  const validateForm = (): boolean => {
    // Validate student ID
    if (!VALIDATION_RULES.STUDENT_ID.pattern.test(formData.studentId)) {
      Swal.fire({
        icon: "error",
        title: "خطأ في الهوية",
        text: VALIDATION_RULES.STUDENT_ID.message,
      });
      return false;
    }

    // Validate phone numbers
    if (!VALIDATION_RULES.PHONE.pattern.test(formData.studentPhone)) {
      Swal.fire({
        icon: "error",
        title: "خطأ في رقم الجوال",
        text: "رقم جوال الطالب يجب أن يكون 10 أرقام",
      });
      return false;
    }

    if (!VALIDATION_RULES.PHONE.pattern.test(formData.guardianPhone)) {
      Swal.fire({
        icon: "error",
        title: "خطأ في رقم الجوال",
        text: "رقم جوال ولي الأمر يجب أن يكون 10 أرقام",
      });
      return false;
    }

    // Validate all required fields
    const requiredFields = [
      "studentName",
      "studentId",
      "studentPhone",
      "studentBirthDate",
      "studentAddress",
      "studentLevel",
      "studentGrade",
      "guardianName",
      "guardianPhone",
      "guardianId",
      "guardianRelationship",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        Swal.fire({
          icon: "error",
          title: "حقول مفقودة",
          text: "يرجى ملء جميع الحقول المطلوبة",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await registerStudent(formData);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "تم التسجيل بنجاح",
          text: "تم استقبال طلب التسجيل الخاص بك. سيتم مراجعته من قبل الإدارة قريباً.",
          confirmButtonText: "العودة للرئيسية",
        }).then(() => {
          setLocation("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "خطأ في التسجيل",
          text: response.error || "حدث خطأ أثناء معالجة طلبك",
        });
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm mb-8">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-900">بوابة التسجيل والقبول</h1>
          <Button variant="outline" onClick={() => setLocation("/")} className="gap-2">
            <i className="fas fa-home"></i>
            الرئيسية
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>نموذج تسجيل طالب جديد</CardTitle>
              <CardDescription>
                يرجى ملء جميع البيانات المطلوبة بعناية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Data Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">بيانات الطالب</h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="studentName">اسم الطالب ثلاثي *</Label>
                      <Input
                        id="studentName"
                        name="studentName"
                        placeholder="أدخل اسم الطالب"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentId">رقم الهوية *</Label>
                      <Input
                        id="studentId"
                        name="studentId"
                        placeholder="أدخل رقم الهوية (8-12 رقم)"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentPhone">رقم جوال الطالب *</Label>
                      <Input
                        id="studentPhone"
                        name="studentPhone"
                        placeholder="أدخل رقم الجوال (10 أرقام)"
                        value={formData.studentPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentBirthDate">تاريخ ميلاد الطالب *</Label>
                      <Input
                        id="studentBirthDate"
                        name="studentBirthDate"
                        type="date"
                        value={formData.studentBirthDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentAddress">العنوان / الحي *</Label>
                      <Input
                        id="studentAddress"
                        name="studentAddress"
                        placeholder="أدخل العنوان"
                        value={formData.studentAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentLevel">المرحلة الدراسية *</Label>
                      <Select value={selectedLevel} onValueChange={handleLevelChange}>
                        <SelectTrigger id="studentLevel">
                          <SelectValue placeholder="اختر المرحلة" />
                        </SelectTrigger>
                        <SelectContent>
                          {APP_CONSTANTS.LEVELS.map(level => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentGrade">الصف الدراسي *</Label>
                      <Select value={formData.studentGrade} onValueChange={(value) => setFormData(prev => ({ ...prev, studentGrade: value }))}>
                        <SelectTrigger id="studentGrade">
                          <SelectValue placeholder="اختر الصف" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedLevel && APP_CONSTANTS.GRADES[selectedLevel as keyof typeof APP_CONSTANTS.GRADES]?.map(grade => (
                            <SelectItem key={grade} value={grade}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Guardian Data Section */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="font-semibold text-gray-900">بيانات ولي الأمر</h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="guardianName">اسم ولي الأمر ثلاثي *</Label>
                      <Input
                        id="guardianName"
                        name="guardianName"
                        placeholder="أدخل اسم ولي الأمر"
                        value={formData.guardianName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guardianPhone">رقم جوال ولي الأمر *</Label>
                      <Input
                        id="guardianPhone"
                        name="guardianPhone"
                        placeholder="أدخل رقم الجوال (10 أرقام)"
                        value={formData.guardianPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guardianId">رقم هوية ولي الأمر *</Label>
                      <Input
                        id="guardianId"
                        name="guardianId"
                        placeholder="أدخل رقم الهوية"
                        value={formData.guardianId}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guardianRelationship">صلة ولي الأمر *</Label>
                      <Select value={formData.guardianRelationship} onValueChange={(value) => setFormData(prev => ({ ...prev, guardianRelationship: value }))}>
                        <SelectTrigger id="guardianRelationship">
                          <SelectValue placeholder="اختر الصلة" />
                        </SelectTrigger>
                        <SelectContent>
                          {APP_CONSTANTS.GUARDIAN_RELATIONSHIPS.map(rel => (
                            <SelectItem key={rel.value} value={rel.value}>
                              {rel.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6 border-t">
                  <Button type="submit" disabled={loading} className="flex-1 gap-2">
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {loading ? "جاري الإرسال..." : "إرسال الطلب"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setLocation("/")} className="flex-1">
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
