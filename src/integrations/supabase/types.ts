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
      accounts: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_verified: boolean | null
          last_login: string | null
          profile_picture: string | null
          role: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          last_login?: string | null
          profile_picture?: string | null
          role?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          last_login?: string | null
          profile_picture?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      communities: {
        Row: {
          description: string | null
          id: string
          member_count: number | null
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          member_count?: number | null
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          member_count?: number | null
          name?: string
        }
        Relationships: []
      }
      dietary_requirements: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      followers: {
        Row: {
          created_at: string | null
          followed_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          followed_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          followed_id?: string
          following_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_followed"
            columns: ["followed_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_following"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      hashtags: {
        Row: {
          id: string
          name: string
          post_count: number | null
        }
        Insert: {
          id?: string
          name: string
          post_count?: number | null
        }
        Update: {
          id?: string
          name?: string
          post_count?: number | null
        }
        Relationships: []
      }
      ingredients: {
        Row: {
          created_at: string | null
          id: string
          name: string
          quantity: string
          recipe_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          quantity: string
          recipe_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          quantity?: string
          recipe_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          caption: string
          comments_count: number | null
          created_at: string | null
          dietary_requirement_id: string | null
          hashtag_id: string | null
          id: string
          image_url: string | null
          likes_count: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          caption: string
          comments_count?: number | null
          created_at?: string | null
          dietary_requirement_id?: string | null
          hashtag_id?: string | null
          id?: string
          image_url?: string | null
          likes_count?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          caption?: string
          comments_count?: number | null
          created_at?: string | null
          dietary_requirement_id?: string | null
          hashtag_id?: string | null
          id?: string
          image_url?: string | null
          likes_count?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_dietary_requirement_id_fkey"
            columns: ["dietary_requirement_id"]
            isOneToOne: false
            referencedRelation: "dietary_requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_hashtag_id_fkey"
            columns: ["hashtag_id"]
            isOneToOne: false
            referencedRelation: "hashtags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_dietary_requirements: {
        Row: {
          dietary_requirement_id: string | null
          id: string
          recipe_id: string | null
        }
        Insert: {
          dietary_requirement_id?: string | null
          id?: string
          recipe_id?: string | null
        }
        Update: {
          dietary_requirement_id?: string | null
          id?: string
          recipe_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_dietary_requirements_dietary_requirement_id_fkey"
            columns: ["dietary_requirement_id"]
            isOneToOne: false
            referencedRelation: "dietary_requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_dietary_requirements_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          calories: number | null
          cost: number | null
          created_at: string | null
          id: string
          image_url: string | null
          ingredients: Json
          instructions: string
          macros: Json | null
          time: number | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          calories?: number | null
          cost?: number | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          ingredients: Json
          instructions: string
          macros?: Json | null
          time?: number | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          calories?: number | null
          cost?: number | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          ingredients?: Json
          instructions?: string
          macros?: Json | null
          time?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_list: {
        Row: {
          created_at: string | null
          id: string
          recipe_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          recipe_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          recipe_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_list_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          max_calories: number | null
          max_cost: number | null
          max_time_minutes: number | null
          min_protein: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          max_calories?: number | null
          max_cost?: number | null
          max_time_minutes?: number | null
          min_protein?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          max_calories?: number | null
          max_cost?: number | null
          max_time_minutes?: number | null
          min_protein?: number | null
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
      [_ in never]: never
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
