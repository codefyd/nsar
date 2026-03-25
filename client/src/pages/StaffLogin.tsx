import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { useState } from "react";
import { login } from "@/lib/api";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";

export default function StaffLogin() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      Swal.fire({
        icon: "warning",
        title: "رمز مفقود",
        text: "يرجى إدخال رمز الدخول",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await login(code);

      if (response.success) {
        // Store the access token
        localStorage.setItem("accessToken", response.data?.token);
        localStorage.setItem("userRole", response.data?.role);
        
        Swal.fire({
          icon: "success",
          title: "تم تسجيل الدخول بنجاح",
          text: `مرحباً ${response.data?.name}`,
          confirmButtonText: "متابعة",
        }).then(() => {
          setLocation("/staff");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "خطأ في تسجيل الدخول",
          text: response.error || "رمز الدخول غير صحيح",
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 flex items-center justify-center">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-900">بوابة العاملين</h1>
          <Button variant="outline" onClick={() => setLocation("/")} className="gap-2">
            <i className="fas fa-home"></i>
            الرئيسية
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-20">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <i className="fas fa-lock text-3xl text-purple-600"></i>
                </div>
              </div>
              <CardTitle>تسجيل الدخول</CardTitle>
              <CardDescription>
                أدخل رمز الدخول الخاص بك للوصول إلى بوابة العاملين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">رمز الدخول</Label>
                  <Input
                    id="code"
                    type="password"
                    placeholder="أدخل رمز الدخول"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full gap-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "جاري الدخول..." : "دخول"}
                </Button>

                <Button type="button" variant="outline" onClick={() => setLocation("/")} className="w-full">
                  إلغاء
                </Button>
              </form>

              <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                <p className="font-semibold mb-2">معلومات مهمة:</p>
                <p>إذا لم تكن تملك رمز دخول، يرجى التواصل مع الإدارة.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
