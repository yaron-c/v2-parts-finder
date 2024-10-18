"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Search, Car, Menu, Facebook, MessageCircle, Phone } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const carManufacturers = [
  "טויוטה", "הונדה", "פורד", "שברולט", "יונדאי", "קיה", "מאזדה", "ניסן", "סובארו",
  "מרצדס-בנץ", "ב.מ.וו", "אאודי", "פולקסווגן", "סקודה", "פיג'ו", "רנו", "סיטרואן",
  "מיצובישי", "סוזוקי", "לקסוס",
]

export function CarPartsSearchComponent() {
  const [vin, setVin] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [partName, setPartName] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [vinError, setVinError] = useState("")
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!vin.trim()) {
      setVinError("שדה VIN הוא שדה חובה")
      return
    }
    setVinError("")
    try {
      // Simulating search result
      setSearchResult(`מחפש חלק "${partName}" עבור רכב עם VIN ${vin} מיצרן ${manufacturer}`)
    } catch (err) {
      setError("אירעה שגיאה בחיפוש. אנא נסה שנית.")
    }
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col" dir="rtl">
      <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Car className="w-8 h-8" />
          <span className="text-xl font-bold">חלקי רכב ישראל</span>
        </div>
        <Button variant="ghost" size="icon">
          <Menu className="w-6 h-6" />
        </Button>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <Car className="w-6 h-6" />
              חיפוש חלקי חילוף לרכב
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="vin" className="flex items-center text-sm font-medium">
                  מספר VIN
                  <span className="text-red-500 mr-1">*</span>
                </Label>
                <Input
                  id="vin"
                  value={vin}
                  onChange={(e) => {
                    setVin(e.target.value)
                    if (e.target.value.trim()) setVinError("")
                  }}
                  placeholder="הזן מספר VIN"
                  required
                  className={`${vinError ? "border-red-500" : ""} text-right`}
                />
                {vinError && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="w-4 h-4 ml-1" />
                    {vinError}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufacturer" className="text-sm font-medium">יצרן הרכב</Label>
                <Select value={manufacturer} onValueChange={setManufacturer}>
                  <SelectTrigger id="manufacturer" className="text-right">
                    <SelectValue placeholder="בחר יצרן רכב" />
                  </SelectTrigger>
                  <SelectContent>
                    {carManufacturers.map((manufacturer) => (
                      <SelectItem key={manufacturer} value={manufacturer}>
                        {manufacturer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="partName" className="text-sm font-medium">שם החלק</Label>
                <Input
                  id="partName"
                  value={partName}
                  onChange={(e) => setPartName(e.target.value)}
                  placeholder="הזן שם החלק המבוקש"
                  className="text-right"
                />
              </div>
              <Button type="submit" className="w-full flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                חפש
              </Button>
            </form>
            {searchResult && (
              <div className="mt-6 p-4 bg-muted rounded-md">
                <h3 className="font-semibold mb-2 text-primary">תוצאות החיפוש:</h3>
                <p>{searchResult}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-100 text-gray-600 py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2024 חלקי רכב ישראל. כל הזכויות שמורות.</p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <Facebook className="w-5 h-5" />
              <span className="sr-only">פייסבוק</span>
            </a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <MessageCircle className="w-5 h-5" />
              <span className="sr-only">טלגרם</span>
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <Phone className="w-5 h-5" />
              <span className="sr-only">וואטסאפ</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}