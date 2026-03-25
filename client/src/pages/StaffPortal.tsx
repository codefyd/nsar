import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { getUserData } from "@/lib/api";
import Swal from "sweetalert2";

export default function StaffPortal() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      const role = localStorage.getItem("userRole");

      if (!token) {
        setLocation("/staff-login");
        return;
      }

      try {
        const response = await getUserData();
        if (response.success) {
          setUser(response.data);
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userRole");
          setLocation("/staff-login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setLocation]);

  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "تسجيل الخروج",
      text: "هل تريد تسجيل الخروج؟",
      showCancelButton: true,
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        setLocation("/");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-purple-600 mb-4"></i>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const role = localStorage.getItem("userRole");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-purple-900">بوابة العاملين</h1>
            <p className="text-sm text-gray-600">مرحباً {user.name} - {user.role}</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setLocation("/")} className="gap-2">
              <i className="fas fa-home"></i>
              الرئيسية
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="gap-2">
              <i className="fas fa-sign-out-alt"></i>
              خروج
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            {(role === "معلم" || role === "مشرف_تعليمي" || role === "مشرف_إداري" || role === "مدير") && (
              <TabsTrigger value="students">الطلاب</TabsTrigger>
            )}
            {(role === "مشرف_إداري" || role === "مدير") && (
              <TabsTrigger value="requests">الطلبات</TabsTrigger>
            )}
            {(role === "مشرف_تعليمي" || role === "مشرف_إداري" || role === "مدير") && (
              <TabsTrigger value="warnings">الإنذارات</TabsTrigger>
            )}
            {(role === "مشرف_إداري" || role === "مدير") && (
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            )}
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>لوحة التحكم</CardTitle>
                <CardDescription>ملخص النظام والإحصائيات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-600">إجمالي الطلاب</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-600">الحلق النشطة</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-600">الإنذارات المعلقة</p>
                    <p className="text-2xl font-bold text-orange-600">0</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-600">الطلبات الجديدة</p>
                    <p className="text-2xl font-bold text-blue-600">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          {(role === "معلم" || role === "مشرف_تعليمي" || role === "مشرف_إداري" || role === "مدير") && (
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>إدارة الطلاب</CardTitle>
                  <CardDescription>عرض وإدارة بيانات الطلاب</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">سيتم إضافة قائمة الطلاب هنا قريباً</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Requests Tab */}
          {(role === "مشرف_إداري" || role === "مدير") && (
            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>الطلبات الواردة</CardTitle>
                  <CardDescription>معالجة طلبات التسجيل والتعديل</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">سيتم إضافة قائمة الطلبات هنا قريباً</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Warnings Tab */}
          {(role === "مشرف_تعليمي" || role === "مشرف_إداري" || role === "مدير") && (
            <TabsContent value="warnings">
              <Card>
                <CardHeader>
                  <CardTitle>الإنذارات</CardTitle>
                  <CardDescription>إدارة الإنذارات التعليمية والإدارية</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">سيتم إضافة قائمة الإنذارات هنا قريباً</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Settings Tab */}
          {(role === "مشرف_إداري" || role === "مدير") && (
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>الإعدادات</CardTitle>
                  <CardDescription>إدارة القوالب والعتبات والمستخدمين</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">سيتم إضافة صفحة الإعدادات هنا قريباً</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}
