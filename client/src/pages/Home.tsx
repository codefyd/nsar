import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-900">نظام إدارة مجمع حلق تحفيظ القرآن الكريم</h1>
          <p className="mt-2 text-gray-600">منصة متكاملة لإدارة الطلاب والحلق والإنذارات</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Student Registration Portal */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setLocation('/register')}>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <i className="fas fa-user-plus text-2xl text-blue-600"></i>
              </div>
              <CardTitle>بوابة التسجيل والقبول</CardTitle>
              <CardDescription>تسجيل طلاب جدد</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                قدم طلب تسجيل جديد للمجمع وأدخل بيانات الطالب وولي الأمر
              </p>
            </CardContent>
          </Card>

          {/* Student Data Portal */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setLocation('/student-data')}>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <i className="fas fa-graduation-cap text-2xl text-green-600"></i>
              </div>
              <CardTitle>بوابة بيانات الطالب</CardTitle>
              <CardDescription>عرض وتحديث البيانات</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                استعرض بيانات الطالب وقم بتحديث المعلومات المسموح بتعديلها
              </p>
            </CardContent>
          </Card>

          {/* Staff Portal */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setLocation('/staff-login')}>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <i className="fas fa-lock text-2xl text-purple-600"></i>
              </div>
              <CardTitle>بوابة العاملين</CardTitle>
              <CardDescription>دخول آمن للعاملين</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                دخول آمن للمعلمين والمشرفين والمديرين لإدارة النظام
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">المميزات الرئيسية</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex-shrink-0">
                <i className="fas fa-database text-2xl text-blue-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">إدارة البيانات</h3>
                <p className="text-sm text-gray-600">نظام متكامل لإدارة بيانات الطلاب والحلق</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex-shrink-0">
                <i className="fas fa-bell text-2xl text-orange-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">الإنذارات</h3>
                <p className="text-sm text-gray-600">نظام إنذارات تعليمية وإدارية متقدم</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex-shrink-0">
                <i className="fas fa-comments text-2xl text-green-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">التواصل</h3>
                <p className="text-sm text-gray-600">تواصل مباشر عبر واتساب مع الطلاب وأولياء الأمور</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex-shrink-0">
                <i className="fas fa-cog text-2xl text-red-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">الإعدادات</h3>
                <p className="text-sm text-gray-600">إدارة مركزية للقوالب والعتبات والمستخدمين</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600">
            © 2026 نظام إدارة مجمع حلق تحفيظ القرآن الكريم. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}
