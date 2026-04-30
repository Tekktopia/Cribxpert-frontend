export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      amenities: {
        Row: {
          created_at: string
          icon_id: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          icon_id?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          icon_id?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "amenities_icon_id_fkey"
            columns: ["icon_id"]
            isOneToOne: false
            referencedRelation: "amenity_icons"
            referencedColumns: ["id"]
          },
        ]
      }
      amenity_icons: {
        Row: {
          created_at: string
          file_name: string
          file_type: string
          file_url: string
          id: string
          public_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_type: string
          file_url: string
          id?: string
          public_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          public_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      bedroom_images: {
        Row: {
          created_at: string
          file_name: string
          file_type: string
          file_url: string
          id: string
          public_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_type: string
          file_url: string
          id?: string
          public_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          public_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          age: number
          cancellation_by: string | null
          cancellation_date: string | null
          cancellation_fee: number
          cancellation_reason: string | null
          created_at: string
          email: string
          end_date: string
          escrow_status: Database["public"]["Enums"]["escrow_status"]
          first_name: string
          id: string
          kyc_expires_at: string | null
          kyc_link: string | null
          last_name: string
          listing_id: string
          location: string
          message: string
          paid_at: string | null
          payment_account_name: string | null
          payment_account_number: string | null
          payment_bank_name: string | null
          payment_currency: string
          phone_no: string
          provider_reference: string | null
          refund_status: Database["public"]["Enums"]["refund_status"]
          sex: string
          start_date: string
          status: Database["public"]["Enums"]["booking_status"]
          sznd_transaction_id: string | null
          sznd_user_id: string | null
          total_price: number
          total_refund: number
          travelers_no: number
          updated_at: string
          user_id: string
        }
        Insert: {
          age: number
          cancellation_by?: string | null
          cancellation_date?: string | null
          cancellation_fee?: number
          cancellation_reason?: string | null
          created_at?: string
          email: string
          end_date: string
          escrow_status?: Database["public"]["Enums"]["escrow_status"]
          first_name: string
          id?: string
          kyc_expires_at?: string | null
          kyc_link?: string | null
          last_name: string
          listing_id: string
          location: string
          message: string
          paid_at?: string | null
          payment_account_name?: string | null
          payment_account_number?: string | null
          payment_bank_name?: string | null
          payment_currency?: string
          phone_no: string
          provider_reference?: string | null
          refund_status?: Database["public"]["Enums"]["refund_status"]
          sex: string
          start_date: string
          status?: Database["public"]["Enums"]["booking_status"]
          sznd_transaction_id?: string | null
          sznd_user_id?: string | null
          total_price: number
          total_refund?: number
          travelers_no: number
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number
          cancellation_by?: string | null
          cancellation_date?: string | null
          cancellation_fee?: number
          cancellation_reason?: string | null
          created_at?: string
          email?: string
          end_date?: string
          escrow_status?: Database["public"]["Enums"]["escrow_status"]
          first_name?: string
          id?: string
          kyc_expires_at?: string | null
          kyc_link?: string | null
          last_name?: string
          listing_id?: string
          location?: string
          message?: string
          paid_at?: string | null
          payment_account_name?: string | null
          payment_account_number?: string | null
          payment_bank_name?: string | null
          payment_currency?: string
          phone_no?: string
          provider_reference?: string | null
          refund_status?: Database["public"]["Enums"]["refund_status"]
          sex?: string
          start_date?: string
          status?: Database["public"]["Enums"]["booking_status"]
          sznd_transaction_id?: string | null
          sznd_user_id?: string | null
          total_price?: number
          total_refund?: number
          travelers_no?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      broadcast_notifications: {
        Row: {
          audience: string | null
          created_at: string | null
          id: string
          message: string
          scheduled_at: string | null
          sent_at: string | null
          status: string | null
          title: string
        }
        Insert: {
          audience?: string | null
          created_at?: string | null
          id?: string
          message: string
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          title: string
        }
        Update: {
          audience?: string | null
          created_at?: string | null
          id?: string
          message?: string
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      conversation_members: {
        Row: {
          conversation_id: string
          user_id: string
        }
        Insert: {
          conversation_id: string
          user_id: string
        }
        Update: {
          conversation_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_members_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          last_message_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      favourites: {
        Row: {
          created_at: string
          listing_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          listing_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          listing_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favourites_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favourites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      house_rules: {
        Row: {
          created_at: string
          icon_id: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          icon_id?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          icon_id?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "house_rules_icon_id_fkey"
            columns: ["icon_id"]
            isOneToOne: false
            referencedRelation: "house_rules_icons"
            referencedColumns: ["id"]
          },
        ]
      }
      house_rules_icons: {
        Row: {
          created_at: string
          file_name: string
          file_type: string
          file_url: string
          id: string
          public_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_type: string
          file_url: string
          id?: string
          public_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          public_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      listing_amenities: {
        Row: {
          amenity_id: string
          listing_id: string
        }
        Insert: {
          amenity_id: string
          listing_id: string
        }
        Update: {
          amenity_id?: string
          listing_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_amenities_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_house_rules: {
        Row: {
          house_rule_id: string
          listing_id: string
        }
        Insert: {
          house_rule_id: string
          listing_id: string
        }
        Update: {
          house_rule_id?: string
          listing_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_house_rules_house_rule_id_fkey"
            columns: ["house_rule_id"]
            isOneToOne: false
            referencedRelation: "house_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_house_rules_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_images: {
        Row: {
          created_at: string
          file_name: string
          file_type: string
          file_url: string
          id: string
          public_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_type: string
          file_url: string
          id?: string
          public_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          public_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      listing_listing_images: {
        Row: {
          listing_id: string
          listing_image_id: string
          sort_order: number
        }
        Insert: {
          listing_id: string
          listing_image_id: string
          sort_order?: number
        }
        Update: {
          listing_id?: string
          listing_image_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "listing_listing_images_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_listing_images_listing_image_id_fkey"
            columns: ["listing_image_id"]
            isOneToOne: false
            referencedRelation: "listing_images"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          additional_rules: string | null
          approved_at: string | null
          approved_by: string | null
          available_from: string | null
          available_until: string | null
          base_price: number | null
          bathroom_no: number | null
          bedroom_no: number | null
          city: string | null
          cleaning_fee: number | null
          country: string | null
          created_at: string
          description: string | null
          guest_no: number | null
          hide_status: boolean
          id: string
          latitude: number
          longitude: number
          name: string
          postal_code: string | null
          property_id: string | null
          property_type_id: string | null
          rating: number
          security_deposit: number | null
          size: number
          state: string | null
          status: Database["public"]["Enums"]["listing_status"]
          street: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          additional_rules?: string | null
          approved_at?: string | null
          approved_by?: string | null
          available_from?: string | null
          available_until?: string | null
          base_price?: number | null
          bathroom_no?: number | null
          bedroom_no?: number | null
          city?: string | null
          cleaning_fee?: number | null
          country?: string | null
          created_at?: string
          description?: string | null
          guest_no?: number | null
          hide_status?: boolean
          id?: string
          latitude?: number
          longitude?: number
          name: string
          postal_code?: string | null
          property_id?: string | null
          property_type_id?: string | null
          rating?: number
          security_deposit?: number | null
          size?: number
          state?: string | null
          status?: Database["public"]["Enums"]["listing_status"]
          street?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          additional_rules?: string | null
          approved_at?: string | null
          approved_by?: string | null
          available_from?: string | null
          available_until?: string | null
          base_price?: number | null
          bathroom_no?: number | null
          bedroom_no?: number | null
          city?: string | null
          cleaning_fee?: number | null
          country?: string | null
          created_at?: string
          description?: string | null
          guest_no?: number | null
          hide_status?: boolean
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          postal_code?: string | null
          property_id?: string | null
          property_type_id?: string | null
          rating?: number
          security_deposit?: number | null
          size?: number
          state?: string | null
          status?: Database["public"]["Enums"]["listing_status"]
          street?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_property_type_id_fkey"
            columns: ["property_type_id"]
            isOneToOne: false
            referencedRelation: "property_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_read_by: {
        Row: {
          message_id: string
          read_at: string
          user_id: string
        }
        Insert: {
          message_id: string
          read_at?: string
          user_id: string
        }
        Update: {
          message_id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_read_by_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_read_by_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          conversation_id: string
          created_at: string
          id: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          body: string
          conversation_id: string
          created_at?: string
          id?: string
          sender_id: string
          updated_at?: string
        }
        Update: {
          body?: string
          conversation_id?: string
          created_at?: string
          id?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          booking_id: string | null
          category: string
          created_at: string
          description: string
          id: string
          is_read: boolean | null
          listing_id: string | null
          message: string | null
          status: Database["public"]["Enums"]["notification_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_id?: string | null
          category: string
          created_at?: string
          description: string
          id?: string
          is_read?: boolean | null
          listing_id?: string | null
          message?: string | null
          status?: Database["public"]["Enums"]["notification_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_id?: string | null
          category?: string
          created_at?: string
          description?: string
          id?: string
          is_read?: boolean | null
          listing_id?: string | null
          message?: string | null
          status?: Database["public"]["Enums"]["notification_status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_disabled: boolean
          block_reason: string | null
          bookings_updates: boolean
          created_at: string
          date_of_birth: string | null
          dob: string | null
          email: string
          email_alerts: boolean
          full_name: string | null
          id: string
          kyc_status: Database["public"]["Enums"]["kyc_status"]
          last_login: string | null
          new_listing_submission: boolean
          phone_no: string | null
          phone_number: string | null
          profile_image: string | null
          push_subscriptions: Json
          role: Database["public"]["Enums"]["user_role"]
          sznd_user_id: string | null
          sznd_user_tag: string | null
          two_factor_authentication: boolean
          updated_at: string
          wallet_status: Database["public"]["Enums"]["wallet_provision_status"]
        }
        Insert: {
          account_disabled?: boolean
          block_reason?: string | null
          bookings_updates?: boolean
          created_at?: string
          date_of_birth?: string | null
          dob?: string | null
          email: string
          email_alerts?: boolean
          full_name?: string | null
          id: string
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          last_login?: string | null
          new_listing_submission?: boolean
          phone_no?: string | null
          phone_number?: string | null
          profile_image?: string | null
          push_subscriptions?: Json
          role?: Database["public"]["Enums"]["user_role"]
          sznd_user_id?: string | null
          sznd_user_tag?: string | null
          two_factor_authentication?: boolean
          updated_at?: string
          wallet_status?: Database["public"]["Enums"]["wallet_provision_status"]
        }
        Update: {
          account_disabled?: boolean
          block_reason?: string | null
          bookings_updates?: boolean
          created_at?: string
          date_of_birth?: string | null
          dob?: string | null
          email?: string
          email_alerts?: boolean
          full_name?: string | null
          id?: string
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          last_login?: string | null
          new_listing_submission?: boolean
          phone_no?: string | null
          phone_number?: string | null
          profile_image?: string | null
          push_subscriptions?: Json
          role?: Database["public"]["Enums"]["user_role"]
          sznd_user_id?: string | null
          sznd_user_tag?: string | null
          two_factor_authentication?: boolean
          updated_at?: string
          wallet_status?: Database["public"]["Enums"]["wallet_provision_status"]
        }
        Relationships: []
      }
      property_type_icons: {
        Row: {
          created_at: string
          file_name: string
          file_type: string
          file_url: string
          id: string
          public_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_type: string
          file_url: string
          id?: string
          public_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          public_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      property_types: {
        Row: {
          created_at: string
          icon_id: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          icon_id?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          icon_id?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_types_icon_id_fkey"
            columns: ["icon_id"]
            isOneToOne: false
            referencedRelation: "property_type_icons"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string | null
          endpoint: string
          id: string
          p256dh: string
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string | null
          endpoint: string
          id?: string
          p256dh: string
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string | null
          endpoint?: string
          id?: string
          p256dh?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          rating: number
          review: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          rating: number
          review: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          rating?: number
          review?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_notes: {
        Row: {
          added_by: string
          created_at: string
          id: string
          message: string
          ticket_id: string
          type: Database["public"]["Enums"]["ticket_note_type"]
        }
        Insert: {
          added_by: string
          created_at?: string
          id?: string
          message: string
          ticket_id: string
          type?: Database["public"]["Enums"]["ticket_note_type"]
        }
        Update: {
          added_by?: string
          created_at?: string
          id?: string
          message?: string
          ticket_id?: string
          type?: Database["public"]["Enums"]["ticket_note_type"]
        }
        Relationships: [
          {
            foreignKeyName: "ticket_notes_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          assigned_to: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          message: string
          phone: string
          priority: Database["public"]["Enums"]["ticket_priority"]
          source: Database["public"]["Enums"]["ticket_source"]
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          ticket_id: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name?: string
          message: string
          phone?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          source?: Database["public"]["Enums"]["ticket_source"]
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          ticket_id: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string
          phone?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          source?: Database["public"]["Enums"]["ticket_source"]
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          ticket_id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: { Args: never; Returns: boolean }
      is_super_or_admin: { Args: never; Returns: boolean }
      notify_admins: {
        Args: {
          p_booking_id?: string
          p_category: string
          p_description: string
          p_listing_id?: string
          p_title: string
        }
        Returns: undefined
      }
      notify_user: {
        Args: {
          p_category?: string
          p_description: string
          p_title: string
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      booking_status: "Pending" | "Confirmed" | "Cancelled" | "Completed"
      escrow_status:
        | "AWAITING_KYC"
        | "AWAITING_PAYMENT"
        | "FUNDS_HELD"
        | "DELIVERY_CONFIRMED"
        | "DISBURSED"
        | "DISPUTED"
        | "REFUNDED"
      kyc_status: "not_started" | "pending" | "verified" | "failed"
      listing_status: "pending" | "approved" | "rejected" | "flagged"
      notification_category: "booking" | "payment" | "reviews"
      notification_status: "read" | "unread"
      refund_status: "Pending" | "Not Applicable" | "Completed"
      ticket_note_type: "reply" | "note"
      ticket_priority: "low" | "medium" | "high" | "urgent"
      ticket_source: "website" | "email" | "phone" | "admin"
      ticket_status: "pending" | "in-progress" | "resolved" | "closed"
      user_role: "user" | "admin" | "superadmin" | "finance_admin" | "csr_admin"
      wallet_provision_status: "not_created" | "pending" | "ready" | "failed"
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
      booking_status: ["Pending", "Confirmed", "Cancelled", "Completed"],
      escrow_status: [
        "AWAITING_KYC",
        "AWAITING_PAYMENT",
        "FUNDS_HELD",
        "DELIVERY_CONFIRMED",
        "DISBURSED",
        "DISPUTED",
        "REFUNDED",
      ],
      kyc_status: ["not_started", "pending", "verified", "failed"],
      listing_status: ["pending", "approved", "rejected", "flagged"],
      notification_category: ["booking", "payment", "reviews"],
      notification_status: ["read", "unread"],
      refund_status: ["Pending", "Not Applicable", "Completed"],
      ticket_note_type: ["reply", "note"],
      ticket_priority: ["low", "medium", "high", "urgent"],
      ticket_source: ["website", "email", "phone", "admin"],
      ticket_status: ["pending", "in-progress", "resolved", "closed"],
      user_role: ["user", "admin", "superadmin", "finance_admin", "csr_admin"],
      wallet_provision_status: ["not_created", "pending", "ready", "failed"],
    },
  },
} as const
