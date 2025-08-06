export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      bids: {
        Row: {
          accepted_at: string | null
          amount: number
          bidder_id: string
          custom_deposit_percentage: number | null
          deposit_amount: number | null
          deposit_option: Database["public"]["Enums"]["deposit_option"]
          estimated_hours: number | null
          hourly_rate: number | null
          id: string
          job_id: string
          proposal: string
          status: Database["public"]["Enums"]["bid_status"]
          submitted_at: string
        }
        Insert: {
          accepted_at?: string | null
          amount: number
          bidder_id: string
          custom_deposit_percentage?: number | null
          deposit_amount?: number | null
          deposit_option?: Database["public"]["Enums"]["deposit_option"]
          estimated_hours?: number | null
          hourly_rate?: number | null
          id?: string
          job_id: string
          proposal: string
          status?: Database["public"]["Enums"]["bid_status"]
          submitted_at?: string
        }
        Update: {
          accepted_at?: string | null
          amount?: number
          bidder_id?: string
          custom_deposit_percentage?: number | null
          deposit_amount?: number | null
          deposit_option?: Database["public"]["Enums"]["deposit_option"]
          estimated_hours?: number | null
          hourly_rate?: number | null
          id?: string
          job_id?: string
          proposal?: string
          status?: Database["public"]["Enums"]["bid_status"]
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bids_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_followers: {
        Row: {
          followed_at: string
          id: string
          job_id: string
          user_id: string
        }
        Insert: {
          followed_at?: string
          id?: string
          job_id: string
          user_id: string
        }
        Update: {
          followed_at?: string
          id?: string
          job_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_followers_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_qa: {
        Row: {
          answer: string | null
          created_at: string
          id: string
          job_id: string
          parent_id: string | null
          question: string | null
          user_id: string
        }
        Insert: {
          answer?: string | null
          created_at?: string
          id?: string
          job_id: string
          parent_id?: string | null
          question?: string | null
          user_id: string
        }
        Update: {
          answer?: string | null
          created_at?: string
          id?: string
          job_id?: string
          parent_id?: string | null
          question?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_qa_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_qa_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "job_qa"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          address: string | null
          approximate_hours: number | null
          bid_includes_mva: boolean | null
          bidding_end_date: string | null
          bidding_start_date: string | null
          budget_max: number | null
          category: string
          created_at: string
          description: string
          fixed_price: number | null
          guidelines: string | null
          hourly_rate: number | null
          id: string
          image_urls: string[] | null
          latitude: number | null
          longitude: number | null
          materials_provided: boolean | null
          mva_enabled: boolean | null
          payment_type: Database["public"]["Enums"]["payment_type"]
          project_end_date: string | null
          project_start_date: string | null
          service_category:
            | Database["public"]["Enums"]["service_category"]
            | null
          status: Database["public"]["Enums"]["job_status"]
          title: string
          updated_at: string
          urgency_level: Database["public"]["Enums"]["urgency_level"]
          user_id: string
        }
        Insert: {
          address?: string | null
          approximate_hours?: number | null
          bid_includes_mva?: boolean | null
          bidding_end_date?: string | null
          bidding_start_date?: string | null
          budget_max?: number | null
          category: string
          created_at?: string
          description: string
          fixed_price?: number | null
          guidelines?: string | null
          hourly_rate?: number | null
          id?: string
          image_urls?: string[] | null
          latitude?: number | null
          longitude?: number | null
          materials_provided?: boolean | null
          mva_enabled?: boolean | null
          payment_type?: Database["public"]["Enums"]["payment_type"]
          project_end_date?: string | null
          project_start_date?: string | null
          service_category?:
            | Database["public"]["Enums"]["service_category"]
            | null
          status?: Database["public"]["Enums"]["job_status"]
          title: string
          updated_at?: string
          urgency_level?: Database["public"]["Enums"]["urgency_level"]
          user_id: string
        }
        Update: {
          address?: string | null
          approximate_hours?: number | null
          bid_includes_mva?: boolean | null
          bidding_end_date?: string | null
          bidding_start_date?: string | null
          budget_max?: number | null
          category?: string
          created_at?: string
          description?: string
          fixed_price?: number | null
          guidelines?: string | null
          hourly_rate?: number | null
          id?: string
          image_urls?: string[] | null
          latitude?: number | null
          longitude?: number | null
          materials_provided?: boolean | null
          mva_enabled?: boolean | null
          payment_type?: Database["public"]["Enums"]["payment_type"]
          project_end_date?: string | null
          project_start_date?: string | null
          service_category?:
            | Database["public"]["Enums"]["service_category"]
            | null
          status?: Database["public"]["Enums"]["job_status"]
          title?: string
          updated_at?: string
          urgency_level?: Database["public"]["Enums"]["urgency_level"]
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean | null
          job_id: string | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          job_id?: string | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          job_id?: string | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          bid_id: string | null
          created_at: string
          id: string
          job_id: string
          payee_id: string
          payer_id: string
          payment_type: string
          status: string
          stripe_payment_intent_id: string | null
        }
        Insert: {
          amount: number
          bid_id?: string | null
          created_at?: string
          id?: string
          job_id: string
          payee_id: string
          payer_id: string
          payment_type: string
          status?: string
          stripe_payment_intent_id?: string | null
        }
        Update: {
          amount?: number
          bid_id?: string | null
          created_at?: string
          id?: string
          job_id?: string
          payee_id?: string
          payer_id?: string
          payment_type?: string
          status?: string
          stripe_payment_intent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_bid_id_fkey"
            columns: ["bid_id"]
            isOneToOne: false
            referencedRelation: "bids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          business_license: string | null
          company_name: string | null
          created_at: string
          full_name: string | null
          id: string
          insurance_info: Json | null
          is_service_provider: boolean | null
          is_verified_professional: boolean | null
          phone: string | null
          rating: number | null
          total_jobs_completed: number | null
          updated_at: string
          user_id: string
          verification_documents: Json | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          business_license?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          insurance_info?: Json | null
          is_service_provider?: boolean | null
          is_verified_professional?: boolean | null
          phone?: string | null
          rating?: number | null
          total_jobs_completed?: number | null
          updated_at?: string
          user_id: string
          verification_documents?: Json | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          business_license?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          insurance_info?: Json | null
          is_service_provider?: boolean | null
          is_verified_professional?: boolean | null
          phone?: string | null
          rating?: number | null
          total_jobs_completed?: number | null
          updated_at?: string
          user_id?: string
          verification_documents?: Json | null
        }
        Relationships: []
      }
      provider_specialties: {
        Row: {
          created_at: string
          experience_years: number | null
          id: string
          is_verified: boolean | null
          specialty: Database["public"]["Enums"]["service_category"]
          user_id: string
        }
        Insert: {
          created_at?: string
          experience_years?: number | null
          id?: string
          is_verified?: boolean | null
          specialty: Database["public"]["Enums"]["service_category"]
          user_id: string
        }
        Update: {
          created_at?: string
          experience_years?: number | null
          id?: string
          is_verified?: boolean | null
          specialty?: Database["public"]["Enums"]["service_category"]
          user_id?: string
        }
        Relationships: []
      }
      ticket_messages: {
        Row: {
          created_at: string
          id: string
          is_staff_reply: boolean
          message: string
          ticket_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_staff_reply?: boolean
          message: string
          ticket_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_staff_reply?: boolean
          message?: string
          ticket_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_ticket_messages_ticket_id"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          priority: Database["public"]["Enums"]["ticket_priority"]
          status: Database["public"]["Enums"]["ticket_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          status?: Database["public"]["Enums"]["ticket_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          status?: Database["public"]["Enums"]["ticket_status"]
          title?: string
          updated_at?: string
          user_id?: string
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
      bid_status: "pending" | "accepted" | "rejected" | "withdrawn"
      deposit_option: "25_percent" | "custom" | "full_payment"
      job_status:
        | "draft"
        | "active"
        | "bidding_closed"
        | "in_progress"
        | "completed"
        | "cancelled"
      payment_type: "fixed" | "hourly"
      service_category:
        | "electrical"
        | "plumbing"
        | "carpentry"
        | "gardening"
        | "cleaning"
        | "painting"
        | "roofing"
        | "hvac"
        | "flooring"
        | "general"
      ticket_priority: "low" | "medium" | "high" | "urgent"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
      urgency_level: "asap" | "within_week" | "flexible"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      bid_status: ["pending", "accepted", "rejected", "withdrawn"],
      deposit_option: ["25_percent", "custom", "full_payment"],
      job_status: [
        "draft",
        "active",
        "bidding_closed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      payment_type: ["fixed", "hourly"],
      service_category: [
        "electrical",
        "plumbing",
        "carpentry",
        "gardening",
        "cleaning",
        "painting",
        "roofing",
        "hvac",
        "flooring",
        "general",
      ],
      ticket_priority: ["low", "medium", "high", "urgent"],
      ticket_status: ["open", "in_progress", "resolved", "closed"],
      urgency_level: ["asap", "within_week", "flexible"],
    },
  },
} as const
