"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormContext } from "@/contexts/form-context"

const provinces = [
  "Province No. 1",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
];


export function AddressStep() {
  const { formData, updateFormData } = useFormContext()

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Address</h2>
        <p className="text-gray-600">Provide your current address information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">
            City <span className="text-red-500">*</span>
          </Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="Enter your city"
            className="rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">
            Postal Code <span className="text-red-500">*</span>
          </Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => handleInputChange("postalCode", e.target.value)}
            placeholder="Enter postal code"
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentAddress">
          Current Address <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="currentAddress"
          value={formData.currentAddress}
          onChange={(e) => handleInputChange("currentAddress", e.target.value)}
          placeholder="Enter your complete address"
          className="rounded-lg min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label>
          Province <span className="text-red-500">*</span>
        </Label>
        <Select value={formData.province} onValueChange={(value) => handleInputChange("province", value)}>
          <SelectTrigger className="rounded-lg w-[7rem]">
            <SelectValue placeholder="Select Province" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  )
}
