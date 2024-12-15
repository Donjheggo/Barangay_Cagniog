export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string
          date: string | null
          gcash_reference_number: string | null
          id: string
          payment_method: Database["public"]["Enums"]["PAYMENT_METHOD"]
          quantity: number | null
          resident_id: string
          service_id: string
          status: Database["public"]["Enums"]["APPOINTMENT_STATUS"]
          total_amount: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          gcash_reference_number?: string | null
          id?: string
          payment_method?: Database["public"]["Enums"]["PAYMENT_METHOD"]
          quantity?: number | null
          resident_id?: string
          service_id?: string
          status?: Database["public"]["Enums"]["APPOINTMENT_STATUS"]
          total_amount?: number | null
          user_id?: string
        }
        Update: {
          created_at?: string
          date?: string | null
          gcash_reference_number?: string | null
          id?: string
          payment_method?: Database["public"]["Enums"]["PAYMENT_METHOD"]
          quantity?: number | null
          resident_id?: string
          service_id?: string
          status?: Database["public"]["Enums"]["APPOINTMENT_STATUS"]
          total_amount?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "residents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      gcash_number: {
        Row: {
          created_at: string
          id: string
          number: string
        }
        Insert: {
          created_at?: string
          id?: string
          number: string
        }
        Update: {
          created_at?: string
          id?: string
          number?: string
        }
        Relationships: []
      }
      officials: {
        Row: {
          created_at: string
          id: string
          name: string
          position: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          position: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          position?: string
        }
        Relationships: []
      }
      puroks: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          id: string
          reason: string | null
          resident_id: string
          status: Database["public"]["Enums"]["REPORT_STATUS"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          reason?: string | null
          resident_id?: string
          status?: Database["public"]["Enums"]["REPORT_STATUS"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          reason?: string | null
          resident_id?: string
          status?: Database["public"]["Enums"]["REPORT_STATUS"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "report_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "residents"
            referencedColumns: ["id"]
          },
        ]
      }
      residents: {
        Row: {
          birthdate: string
          created_at: string
          gender: Database["public"]["Enums"]["GENDER"]
          id: string
          income: string | null
          name: string
          place_of_birth: string | null
          purok_id: string
          religion: string | null
          school_degree: string | null
          years_of_residency: number | null
        }
        Insert: {
          birthdate: string
          created_at?: string
          gender: Database["public"]["Enums"]["GENDER"]
          id?: string
          income?: string | null
          name: string
          place_of_birth?: string | null
          purok_id?: string
          religion?: string | null
          school_degree?: string | null
          years_of_residency?: number | null
        }
        Update: {
          birthdate?: string
          created_at?: string
          gender?: Database["public"]["Enums"]["GENDER"]
          id?: string
          income?: string | null
          name?: string
          place_of_birth?: string | null
          purok_id?: string
          religion?: string | null
          school_degree?: string | null
          years_of_residency?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "residents_purok_id_fkey"
            columns: ["purok_id"]
            isOneToOne: false
            referencedRelation: "puroks"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          id: string
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          price: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          role: Database["public"]["Enums"]["USER_ROLE"]
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          role?: Database["public"]["Enums"]["USER_ROLE"]
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          role?: Database["public"]["Enums"]["USER_ROLE"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      APPOINTMENT_STATUS: "PENDING" | "ACCEPTED" | "COMPLETED"
      GENDER: "MALE" | "FEMALE"
      PAYMENT_METHOD: "GCASH" | "ON_OFFICE"
      REPORT_STATUS: "ON_GOING" | "REJECTED" | "COMPLETED"
      USER_ROLE: "USER" | "ADMIN"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
