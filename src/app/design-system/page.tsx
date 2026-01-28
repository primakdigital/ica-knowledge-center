"use client";

import * as React from "react";
import {
  Lightbulb,
  ClipboardList,
  Users,
  FileText,
  BookOpen,
  Heart,
  Sparkles,
  Gamepad2,
} from "lucide-react";

// Components to showcase
import { SiteHeader } from "@/components/ui/site-header";
import { HeroSearch } from "@/components/ui/hero-search";
import { ActionCard } from "@/components/ui/action-card";
import { TopicChip } from "@/components/ui/topic-chip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Design System Showcase Page
 *
 * Visual Lab for approving component designs before integration.
 * Route: /design-system
 */

export default function DesignSystemPage() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="min-h-screen bg-[var(--ica-gray-50)]">
      {/* ============================================
          1. ORGANISM: SiteHeader
          ============================================ */}
      <section>
        <div className="mb-4 bg-white p-4 border-b">
          <h2 className="text-lg font-bold text-[var(--ica-primary)]">
            1. Organism: SiteHeader
          </h2>
          <p className="text-sm text-[var(--ica-gray-500)]">
            Navy background (#000F37), white text, 72px height
          </p>
        </div>
        <SiteHeader
          onLogoClick={() => console.log("Logo clicked")}
          onSettingsClick={() => console.log("Settings clicked")}
        />
      </section>

      {/* Main Content Container */}
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        {/* ============================================
            2. MOLECULE: HeroSearch
            ============================================ */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[var(--ica-primary)]">
              2. Molecule: HeroSearch
            </h2>
            <p className="text-sm text-[var(--ica-gray-500)]">
              Large search bar with elevation (h-16, shadow-lg, rounded-2xl)
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-b from-[var(--ica-blue-50)] to-white p-12">
            <div className="mx-auto max-w-2xl">
              <HeroSearch
                value={searchValue}
                onChange={setSearchValue}
                onSubmit={() => console.log("Search:", searchValue)}
                placeholder="לדוגמה: התערבות ראשונה, שאלון, טיפול משפחתי, מזעור נזקים…"
                buttonText="חיפוש"
              />
            </div>
          </div>
        </section>

        {/* ============================================
            3. MOLECULE: ActionCard
            ============================================ */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[var(--ica-primary)]">
              3. Molecule: ActionCard
            </h2>
            <p className="text-sm text-[var(--ica-gray-500)]">
              Shortcut cards with lift effect (shadow-sm → shadow-md, -translate-y-1)
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Blue icon */}
            <ActionCard
              icon={<Lightbulb className="h-6 w-6" />}
              iconBg="bg-[var(--ica-blue-50)]"
              iconColor="text-[var(--ica-secondary)]"
              title="התערבות ראשונית"
              description="פרוטוקולים והנחיות לשיחה ראשונה"
              onClick={() => console.log("Card 1 clicked")}
            />

            {/* Card 2: Yellow icon with badge */}
            <ActionCard
              icon={<ClipboardList className="h-6 w-6" />}
              iconBg="bg-[var(--ica-yellow-50)]"
              iconColor="text-[var(--ica-accent)]"
              title="הערכת מצב ושאלונים"
              description="כלי הערכה ואבחון מקצועיים"
              badge={
                <Badge variant="accent-soft" size="sm">
                  כלים
                </Badge>
              }
              onClick={() => console.log("Card 2 clicked")}
            />

            {/* Card 3: Coral icon */}
            <ActionCard
              icon={<Users className="h-6 w-6" />}
              iconBg="bg-[var(--ica-coral-50)]"
              iconColor="text-[var(--ica-sos)]"
              title="שיחה עם משפחה"
              description="הנחיות לעבודה עם בני משפחה"
              onClick={() => console.log("Card 3 clicked")}
            />

            {/* Card 4: Navy icon */}
            <ActionCard
              icon={<FileText className="h-6 w-6" />}
              iconBg="bg-[var(--ica-navy-50)]"
              iconColor="text-[var(--ica-primary)]"
              title="הפניה למסגרות טיפול"
              description="מידע על מסגרות ואפשרויות הפניה"
              onClick={() => console.log("Card 4 clicked")}
            />
          </div>
        </section>

        {/* ============================================
            4. MOLECULE: TopicChip
            ============================================ */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[var(--ica-primary)]">
              4. Molecule: TopicChip
            </h2>
            <p className="text-sm text-[var(--ica-gray-500)]">
              Topic exploration cards (centered icon + label, hover border)
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8">
            <div className="flex flex-wrap justify-center gap-4">
              <TopicChip
                icon={<Users className="h-7 w-7" />}
                label="טיפול משפחתי"
                onClick={() => console.log("Topic: טיפול משפחתי")}
              />
              <TopicChip
                icon={<Sparkles className="h-7 w-7" />}
                label="בני נוער"
                onClick={() => console.log("Topic: בני נוער")}
              />
              <TopicChip
                icon={<FileText className="h-7 w-7" />}
                label="חומרים"
                onClick={() => console.log("Topic: חומרים")}
              />
              <TopicChip
                icon={<Gamepad2 className="h-7 w-7" />}
                label="הימורים"
                isActive={true}
                onClick={() => console.log("Topic: הימורים")}
              />
              <TopicChip
                icon={<Heart className="h-7 w-7" />}
                label="מזעור נזקים"
                onClick={() => console.log("Topic: מזעור נזקים")}
              />
              <TopicChip
                icon={<BookOpen className="h-7 w-7" />}
                label="שיקום"
                onClick={() => console.log("Topic: שיקום")}
              />
            </div>
          </div>
        </section>

        {/* ============================================
            5. REFERENCE: Button Variants
            ============================================ */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[var(--ica-primary)]">
              5. Reference: Button Variants
            </h2>
            <p className="text-sm text-[var(--ica-gray-500)]">
              All button styles for reference
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Primary (Navy)</Button>
              <Button variant="secondary">Secondary (Blue)</Button>
              <Button variant="accent">Accent (Yellow)</Button>
              <Button variant="sos">SOS (Coral)</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
        </section>

        {/* ============================================
            6. REFERENCE: Badge Variants
            ============================================ */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[var(--ica-primary)]">
              6. Reference: Badge Variants
            </h2>
            <p className="text-sm text-[var(--ica-gray-500)]">
              All badge/chip styles for reference
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8">
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">מאמר</Badge>
              <Badge variant="secondary">וידאו</Badge>
              <Badge variant="accent">כלי</Badge>
              <Badge variant="sos">דחוף</Badge>
              <Badge variant="success">חדש</Badge>
              <Badge variant="default-soft">PDF</Badge>
              <Badge variant="secondary-soft">הרצאה</Badge>
              <Badge variant="accent-soft">שאלון</Badge>
              <Badge variant="outline">סינון</Badge>
              <Badge variant="muted">12 דקות</Badge>
            </div>
          </div>
        </section>

        {/* ============================================
            7. COLOR PALETTE
            ============================================ */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[var(--ica-primary)]">
              7. Color Palette
            </h2>
            <p className="text-sm text-[var(--ica-gray-500)]">
              ICA Brand colors from Design System v2.0
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex flex-col gap-2">
                <div className="h-20 rounded-xl bg-[#000F37]" />
                <span className="text-sm font-medium">Primary (Navy)</span>
                <span className="text-xs text-[var(--ica-gray-500)]">#000F37</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-20 rounded-xl bg-[#70B2EB]" />
                <span className="text-sm font-medium">Secondary (Blue)</span>
                <span className="text-xs text-[var(--ica-gray-500)]">#70B2EB</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-20 rounded-xl bg-[#FCC645]" />
                <span className="text-sm font-medium">Accent (Yellow)</span>
                <span className="text-xs text-[var(--ica-gray-500)]">#FCC645</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-20 rounded-xl bg-[#E67167]" />
                <span className="text-sm font-medium">SOS (Coral)</span>
                <span className="text-xs text-[var(--ica-gray-500)]">#E67167</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
