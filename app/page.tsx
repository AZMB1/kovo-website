"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Users,
  Settings,
  TrendingUp,
  UserCheck,
  Target,
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Clock,
  Bookmark,
  Lock,
  RotateCw,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plus,
  BookmarkPlus,
  Bell,
  User,
  Menu,
  X,
  Home as HomeIcon,
  FolderKanban,
  Package,
  CreditCard,
  HelpCircle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function Home() {
  // State for burger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Scroll tracking state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [focusedSection, setFocusedSection] = useState<string | null>(null);
  const [visibleMockups, setVisibleMockups] = useState<Set<string>>(new Set());
  
  // Refs for sections
  const servicesSectionRef = useRef<HTMLElement>(null);
  const sectionTitleRef = useRef<HTMLDivElement>(null);
  const service1Ref = useRef<HTMLDivElement>(null);
  const service2Ref = useRef<HTMLDivElement>(null);
  const service3Ref = useRef<HTMLDivElement>(null);
  const mockup1Ref = useRef<HTMLDivElement>(null);
  const mockup2Ref = useRef<HTMLDivElement>(null);
  const mockup3Ref = useRef<HTMLDivElement>(null);

  // Chart data for Analytics Dashboard
  const revenueData = [
    { month: 'Jan', revenue: 34567, profit: 27234 },
    { month: 'Feb', revenue: 28934, profit: 23891 },
    { month: 'Mar', revenue: 51289, profit: 41876 },
    { month: 'Apr', revenue: 47621, profit: 38492 },
    { month: 'May', revenue: 60843, profit: 49738 },
    { month: 'Jun', revenue: 39127, profit: 31294 },
    { month: 'Jul', revenue: 29456, profit: 23187 },
    { month: 'Aug', revenue: 44782, profit: 36521 },
    { month: 'Sep', revenue: 54938, profit: 43926 },
  ];

  // Scroll tracking effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / documentHeight) * 100, 100);
      
      setScrollProgress(progress);
      
      // Check if scrolled past "What we do" title
      if (sectionTitleRef.current) {
        const titleRect = sectionTitleRef.current.getBoundingClientRect();
        if (titleRect.top < window.innerHeight * 0.5) {
          setShowProgressBar(true);
        } else {
          setShowProgressBar(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (sectionId) {
            setFocusedSection(sectionId);
          }
        }
      });
    }, observerOptions);

    // Observe service sections
    if (service1Ref.current) sectionObserver.observe(service1Ref.current);
    if (service2Ref.current) sectionObserver.observe(service2Ref.current);
    if (service3Ref.current) sectionObserver.observe(service3Ref.current);

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  // Intersection Observer for mockups
  useEffect(() => {
    const mockupObserverOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.2
    };

    const mockupObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const mockupId = entry.target.getAttribute('data-mockup-id');
        if (mockupId) {
          setVisibleMockups((prev) => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(mockupId);
            } else {
              newSet.delete(mockupId);
            }
            return newSet;
          });
        }
      });
    }, mockupObserverOptions);

    // Observe mockups
    if (mockup1Ref.current) mockupObserver.observe(mockup1Ref.current);
    if (mockup2Ref.current) mockupObserver.observe(mockup2Ref.current);
    if (mockup3Ref.current) mockupObserver.observe(mockup3Ref.current);

    return () => {
      mockupObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090a] overflow-hidden">
      {/* Progress Bar - Left Side */}
      {showProgressBar && (
        <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300">
          <div className="relative w-1 h-64 bg-[#23252a] rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#6366f1] to-[#8b5cf6] rounded-full transition-all duration-150 ease-out"
              style={{ height: `${scrollProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Animated Orb Background */}
      <div className="orb-canvas">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
        <div className="orb orb-5"></div>
        <div className="orb orb-6"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#23252a] bg-[#08090a]/80 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#f7f8f8] rounded-md flex items-center justify-center">
              <span className="text-[#08090a] font-bold text-sm">K</span>
            </div>
            <span className="text-[#f7f8f8] font-[590] text-[15px]">KOVO</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-[#d0d6e0] hover:text-[#f7f8f8] text-[15px] font-[400] transition-colors">
              Product
            </a>
            <a href="#" className="text-[#d0d6e0] hover:text-[#f7f8f8] text-[15px] font-[400] transition-colors">
              Services
            </a>
            <a href="#" className="text-[#d0d6e0] hover:text-[#f7f8f8] text-[15px] font-[400] transition-colors">
              Work
            </a>
            <a href="#" className="text-[#d0d6e0] hover:text-[#f7f8f8] text-[15px] font-[400] transition-colors">
              About
            </a>
            <a href="#" className="text-[#d0d6e0] hover:text-[#f7f8f8] text-[15px] font-[400] transition-colors">
              Contact
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="text-[#d0d6e0] hover:text-[#f7f8f8] text-[15px] font-[400] transition-colors">
              Log in
            </button>
            <Button 
              size="sm" 
              className="bg-[#f7f8f8] hover:bg-white text-[#08090a] h-8 px-4 rounded-[6px] font-[510] text-[14px]"
            >
              Sign up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen px-6 pt-32 section-fade-bottom overflow-hidden">
        <div className="max-w-5xl mx-auto">
          {/* Hero Content - Top Aligned */}
          <div className="text-left mb-16">
            {/* Main Headline - Pure White, No Gradients */}
            <h1 className="text-[48px] leading-[1.06] font-[680] text-[#f7f8f8] mb-6 tracking-[-0.022em] max-w-4xl">
              KOVO is a design agency for planning and building products
          </h1>

            {/* Subheadline - Muted Gray */}
            <p className="text-[15px] leading-[1.6] text-[#d0d6e0] max-w-xl mb-10">
              Meet the studio for modern digital experiences.
              <br />
              Streamline design, development, and product launches.
            </p>

            {/* CTA Button */}
            <div className="flex items-start">
              <Button
                size="lg"
                className="bg-[#f7f8f8] hover:bg-white text-[#08090a] px-12 h-11 rounded-[8px] font-[510] text-[15px] transition-all duration-200"
              >
                Start building
              </Button>
            </div>
          </div>

          {/* Stacked Mockups */}
          <div className="relative w-full mx-auto mt-16 px-6" style={{ perspective: "2000px" }}>
            {/* Bottom Card - Leftmost - News/Media Website */}
            <div
              className="bg-[#1a1a1a] rounded-[12px] overflow-hidden absolute"
              style={{ transform: "rotateX(40deg) rotateY(10deg) rotateZ(-20deg) scale(1.4) translateX(-40px)", transformStyle: "preserve-3d", width: "100%", zIndex: 1, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.05)" }}
            >
              {/* Gradient Fade on Right */}
              <div
                className="absolute top-0 right-0 bottom-0 w-full pointer-events-none z-10"
                style={{
                  background: "linear-gradient(to right, transparent 0%, rgba(10, 10, 10, 0.5) 40%, rgba(10, 10, 10, 0.9) 70%, #0a0a0a 100%)",
                }}
              ></div>
              
              {/* Safari Browser Chrome */}
              <div className="bg-[#1a1a1a]">
                {/* Address Bar Row */}
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[#2a2a2a]">
                  {/* Traffic Lights */}
                  <div className="flex items-center gap-2 mr-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
                  {/* Navigation Controls */}
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-[#2a2a2a] rounded">
                      <ChevronLeft className="w-3.5 h-3.5 text-[#888]" />
                    </button>
                    <button className="p-1 hover:bg-[#2a2a2a] rounded">
                      <ChevronRight className="w-3.5 h-3.5 text-[#888]" />
                    </button>
                  </div>

                  {/* Address Bar */}
                  <div className="flex-1 flex items-center gap-2 bg-[#2a2a2a] rounded-md px-3 py-1.5">
                    <Lock className="w-3 h-3 text-[#888]" />
                    <div className="w-3.5 h-3.5 bg-[#ef4444] rounded-sm flex items-center justify-center overflow-hidden">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="14" height="14" fill="#ef4444"/>
                        <path d="M3 3h8v2H3V3zm0 3h8v1H3V6zm0 2h5v1H3V8zm0 2h5v1H3v-1z" fill="white"/>
                        <rect x="9" y="8" width="2" height="3" fill="white"/>
                      </svg>
                    </div>
                    <span className="text-[10px] text-[#ccc] font-medium">news.kovodesign.com</span>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-[#2a2a2a] rounded">
                      <RotateCw className="w-3.5 h-3.5 text-[#888]" />
                    </button>
                    <button className="p-1 hover:bg-[#2a2a2a] rounded">
                      <BookmarkPlus className="w-3.5 h-3.5 text-[#888]" />
                    </button>
                    <button className="p-1 hover:bg-[#2a2a2a] rounded">
                      <Share2 className="w-3.5 h-3.5 text-[#888]" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="aspect-[16/9] bg-[#0a0a0a]">
                {/* Top Navigation Bar */}
                <div className="flex items-center justify-between px-8 py-3 border-b border-[#1f1f1f]">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-6 bg-[#ef4444]"></div>
                      <span className="text-lg font-bold text-[#ffffff] tracking-tight">NEWSWAVE</span>
                    </div>
                    <nav className="flex items-center gap-5 text-[10px] font-medium text-[#888]">
                      <span className="text-[#fff] cursor-pointer">HOME</span>
                      <span className="cursor-pointer hover:text-[#fff]">WORLD</span>
                      <span className="cursor-pointer hover:text-[#fff]">TECH</span>
                      <span className="cursor-pointer hover:text-[#fff]">BUSINESS</span>
                      <span className="cursor-pointer hover:text-[#fff]">SCIENCE</span>
                    </nav>
                  </div>
                  <div className="text-[10px] text-[#666] font-medium">TUESDAY, OCT 29 2025</div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-12 gap-6 p-8 h-[calc(100%-48px)]">
                  {/* Trending Now - Left Column */}
                  <div className="col-span-5 space-y-4">
                    {/* Trending Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-[2px] bg-[#ef4444]"></div>
                        <h3 className="text-[10px] font-bold text-[#fff] uppercase tracking-wider">Trending Now</h3>
                      </div>
                      
                      {/* Trending Articles */}
                      <div className="space-y-3">
                        {/* Article 1 */}
                        <div className="flex gap-3 pb-3 border-b border-[#1f1f1f]">
                          <span className="text-2xl font-bold text-[#333]">01</span>
                          <div className="flex-1 space-y-1">
                            <h4 className="text-sm font-semibold text-[#fff] leading-snug">
                              Quantum Computer Solves Complex Problem in Seconds
                            </h4>
                            <div className="flex items-center gap-2 text-[9px] text-[#666]">
                              <span className="text-[#7c3aed] font-semibold">SCIENCE</span>
                              <span>•</span>
                              <span>2h ago</span>
                            </div>
                          </div>
                        </div>

                        {/* Article 2 */}
                        <div className="flex gap-3 pb-3 border-b border-[#1f1f1f]">
                          <span className="text-2xl font-bold text-[#333]">02</span>
                          <div className="flex-1 space-y-1">
                            <h4 className="text-sm font-semibold text-[#fff] leading-snug">
                              Global Markets Surge on Economic Recovery Signs
                            </h4>
                            <div className="flex items-center gap-2 text-[9px] text-[#666]">
                              <span className="text-[#10b981] font-semibold">BUSINESS</span>
                              <span>•</span>
                              <span>4h ago</span>
                            </div>
                          </div>
                        </div>

                        {/* Article 3 */}
                        <div className="flex gap-3">
                          <span className="text-2xl font-bold text-[#333]">03</span>
                          <div className="flex-1 space-y-1">
                            <h4 className="text-sm font-semibold text-[#fff] leading-snug">
                              Renewable Energy Now Powers 60% of Europe
                            </h4>
                            <div className="flex items-center gap-2 text-[9px] text-[#666]">
                              <span className="text-[#f59e0b] font-semibold">CLIMATE</span>
                              <span>•</span>
                              <span>5h ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Featured Story - Right Column */}
                  <div className="col-span-7 flex flex-col">
                    {/* Featured Image */}
                    <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] rounded-lg mb-4 flex-1 overflow-hidden">
                      {/* Tech-themed abstract visual */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-8 left-8 w-32 h-32 border-2 border-[#00d4ff] rounded-full"></div>
                        <div className="absolute top-16 right-12 w-24 h-24 border-2 border-[#7c3aed] rounded-full"></div>
                        <div className="absolute bottom-8 left-20 w-40 h-40 border border-[#ef4444] rounded-full"></div>
                      </div>
                      {/* Grid overlay */}
                      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                      
                      {/* Live Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#ef4444] px-3 py-1.5 rounded-md">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-[10px] font-bold uppercase tracking-wide">Breaking</span>
                      </div>
                    </div>

                    {/* Headline */}
                    <div className="space-y-2">
                      <h1 className="text-2xl font-bold text-[#ffffff] leading-tight">
                        AI Breakthrough: Tech Giants Collaborate on Revolutionary Open-Source Framework
                      </h1>
                      <div className="flex items-center gap-3 text-[10px] text-[#888]">
                        <span className="text-[#ef4444] font-semibold">TECHNOLOGY</span>
                        <span>•</span>
                        <span>By Sarah Mitchell</span>
                        <span>•</span>
                        <span>12 minutes ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Card - E-commerce Product Page */}
            <div
              className="absolute bg-white rounded-[12px] overflow-hidden"
              style={{ 
                transform: "rotateX(40deg) rotateY(10deg) rotateZ(-20deg) scale(1.4) translateX(120px)", 
                transformStyle: "preserve-3d", 
                width: "100%", 
                zIndex: 2, 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.1)" 
              }}
            >
              {/* Safari Browser Chrome */}
              <div className="bg-[#e8e8e8] border-b border-[#d0d0d0]">
                <div className="flex items-center gap-2 px-3 py-2">
                  {/* Traffic Lights */}
                  <div className="flex items-center gap-2 mr-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                  </div>
                  {/* Navigation Controls */}
                  <div className="flex items-center gap-1">
                    <div className="p-1 hover:bg-[#d5d5d5] rounded cursor-pointer">
                      <ChevronLeft className="w-3.5 h-3.5 text-[#666]" />
                    </div>
                    <div className="p-1 hover:bg-[#d5d5d5] rounded cursor-pointer">
                      <ChevronRight className="w-3.5 h-3.5 text-[#666]" />
                    </div>
                  </div>
                  {/* Address Bar */}
                  <div className="flex-1 flex items-center gap-2 bg-white rounded-md px-3 py-1.5 border border-[#d0d0d0]">
                    <Lock className="w-3 h-3 text-[#888]" />
                    <div className="w-3.5 h-3.5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-sm flex items-center justify-center overflow-hidden">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="ecomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                        </defs>
                        <rect width="14" height="14" fill="url(#ecomGrad)"/>
                        <path d="M4 3.5C4 3.22 4.22 3 4.5 3h5c.28 0 .5.22.5.5V5h1.5c.28 0 .5.22.5.5v6c0 .28-.22.5-.5.5h-9c-.28 0-.5-.22-.5-.5v-6c0-.28.22-.5.5-.5H4V3.5zm1 0V5h4V3.5H5zm-1.5 2v5.5h9V5.5h-9z" fill="white"/>
                        <circle cx="7" cy="8" r="0.8" fill="#6366f1"/>
                      </svg>
                    </div>
                    <span className="text-[10px] text-[#333] font-medium">ecommerce.kovodesign.com</span>
                  </div>
                  {/* Right Controls */}
                  <div className="flex items-center gap-1">
                    <div className="p-1 hover:bg-[#d5d5d5] rounded cursor-pointer">
                      <RotateCw className="w-3.5 h-3.5 text-[#666]" />
                    </div>
                    <div className="p-1 hover:bg-[#d5d5d5] rounded cursor-pointer">
                      <BookmarkPlus className="w-3.5 h-3.5 text-[#666]" />
                    </div>
                    <div className="p-1 hover:bg-[#d5d5d5] rounded cursor-pointer">
                      <Share2 className="w-3.5 h-3.5 text-[#666]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Area - Everything in Left Third */}
              <div className="bg-white" style={{ height: "500px" }}>
                {/* Navigation Menu */}
                <div className="bg-white border-b border-[#e5e7eb] px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="text-lg font-bold text-[#111827]">KOVO</div>
                      <nav className="flex items-center gap-5">
                        <a href="#" className="text-sm font-medium text-[#111827] hover:text-[#6366f1]">New</a>
                        <a href="#" className="text-sm font-medium text-[#6b7280] hover:text-[#111827]">Men</a>
                        <a href="#" className="text-sm font-medium text-[#6b7280] hover:text-[#111827]">Women</a>
                        <a href="#" className="text-sm font-medium text-[#6b7280] hover:text-[#111827]">Sale</a>
                      </nav>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="text-sm font-medium text-[#111827] hover:text-[#6366f1]">Search</button>
                      <button className="text-sm font-medium text-[#111827] hover:text-[#6366f1]">Cart (0)</button>
                    </div>
                  </div>
                </div>

                {/* Product Content - Single Column Layout */}
                <div className="px-6 py-6">
                  <div className="w-[32%] flex flex-col gap-5">
                    {/* Title and Subtitle ABOVE the image */}
                    <div className="flex flex-col gap-2">
                      <div className="inline-block px-2.5 py-1 bg-[#6366f1] text-white rounded-md w-fit">
                        <span className="text-[10px] font-bold uppercase tracking-wide">Bestseller</span>
                      </div>
                      <h1 className="text-2xl font-bold text-[#111827] leading-tight">
                        ProAudio Elite
                      </h1>
                      <h2 className="text-lg font-semibold text-[#6b7280]">
                        Wireless Headphones
                      </h2>
                    </div>

                    {/* Product Image */}
                    <div className="bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] rounded-xl flex items-center justify-center relative" style={{ height: "220px", width: "100%" }}>
                      {/* Background Decorations */}
                      <div className="absolute top-0 left-0 w-24 h-24 bg-[#6366f1]/10 rounded-full blur-2xl"></div>
                      <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#8b5cf6]/10 rounded-full blur-2xl"></div>
                      
                      {/* Smaller Headphone SVG Graphic */}
                      <svg width="140" height="120" viewBox="0 0 200 180" className="relative z-10">
                        {/* Gradient Definition */}
                        <defs>
                          <linearGradient id="headphoneGradientEcom" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1f2937" />
                            <stop offset="100%" stopColor="#111827" />
                          </linearGradient>
                        </defs>
                        {/* Headband */}
                        <path 
                          d="M 20 30 Q 40 10, 60 30 Q 80 10, 100 30 Q 120 10, 140 30 Q 160 10, 180 30" 
                          stroke="#1f2937" 
                          strokeWidth="18" 
                          fill="none" 
                          strokeLinecap="round"
                        />
                        {/* Left Ear Cup */}
                        <rect x="15" y="30" width="45" height="80" rx="15" fill="url(#headphoneGradientEcom)" />
                        {/* Right Ear Cup */}
                        <rect x="140" y="30" width="45" height="80" rx="15" fill="url(#headphoneGradientEcom)" />
                      </svg>
                    </div>

                    {/* Color Patches/Swatches */}
                    <div className="flex gap-2">
                      <div className="w-16 h-16 bg-[#111827] rounded-lg border-[3px] border-[#6366f1] shadow-lg cursor-pointer"></div>
                      <div className="w-16 h-16 bg-[#f7f8f8] rounded-lg border-2 border-[#e5e7eb] shadow-lg cursor-pointer"></div>
                      <div className="w-16 h-16 bg-[#ef4444] rounded-lg border-2 border-[#e5e7eb] shadow-lg cursor-pointer"></div>
                      <div className="w-16 h-16 bg-[#3b82f6] rounded-lg border-2 border-[#e5e7eb] shadow-lg cursor-pointer"></div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-3">
                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-[#fbbf24] text-[#fbbf24]' : 'fill-[#d1d5db] text-[#d1d5db]'}`} />
                          ))}
                        </div>
                        <span className="text-base font-semibold text-[#111827]">4.8</span>
                        <span className="text-sm text-[#9ca3af]">(2,847)</span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold text-[#111827]">$349</span>
                        <div className="flex flex-col">
                          <span className="text-lg text-[#9ca3af] line-through">$499</span>
                          <span className="px-2 py-0.5 bg-[#22c55e] text-white text-[10px] font-bold rounded-md mt-1">SAVE 30%</span>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-2 pt-1">
                        <button className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#111827] hover:bg-[#1f2937] text-white rounded-xl font-bold text-sm transition-all hover:shadow-xl">
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="flex items-center justify-center gap-1.5 px-3 py-2.5 border-2 border-[#e5e7eb] hover:border-[#6366f1] hover:bg-[#6366f1]/5 text-[#111827] rounded-xl text-xs font-semibold transition-all">
                            <Heart className="w-3.5 h-3.5" />
                            Wishlist
                          </button>
                          <button className="flex items-center justify-center gap-1.5 px-3 py-2.5 border-2 border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e] rounded-xl text-xs font-semibold">
                            <Truck className="w-3.5 h-3.5" />
                            Free Ship
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

             {/* Top Card - Rightmost - Professional Analytics Dashboard */}
             <div
               className="bg-[#1a1a1a] rounded-[12px] overflow-hidden absolute"
               style={{ transform: "rotateX(40deg) rotateY(10deg) rotateZ(-20deg) scale(1.4) translateX(280px) translateY(-5px)", transformStyle: "preserve-3d", width: "100%", zIndex: 3, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.05)" }}
             >
               {/* Solid background to block cards behind */}
               <div className="absolute inset-0 bg-[#1a1a1a] z-0"></div>
               
               {/* Safari Browser Chrome */}
               <div className="relative bg-[#1a1a1a] z-10">
                 {/* Address Bar Row */}
                 <div className="flex items-center gap-2 px-3 py-2 border-b border-[#2a2a2a]">
                   {/* Traffic Lights */}
                   <div className="flex items-center gap-2 mr-2">
                     <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                     <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                   </div>
                   {/* Navigation Controls */}
                   <div className="flex items-center gap-1">
                     <button className="p-1 hover:bg-[#2a2a2a] rounded">
                       <ChevronLeft className="w-3.5 h-3.5 text-[#888]" />
                     </button>
                     <button className="p-1 hover:bg-[#2a2a2a] rounded">
                       <ChevronRight className="w-3.5 h-3.5 text-[#888]" />
                     </button>
                   </div>

                   {/* Address Bar */}
                   <div className="flex-1 flex items-center gap-2 bg-[#2a2a2a] rounded-md px-3 py-1.5">
                     <Lock className="w-3 h-3 text-[#888]" />
                     <div className="w-3.5 h-3.5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-md flex items-center justify-center overflow-hidden">
                       <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <defs>
                           <linearGradient id="dashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                             <stop offset="0%" stopColor="#6366f1" />
                             <stop offset="100%" stopColor="#8b5cf6" />
                           </linearGradient>
                         </defs>
                         <rect width="14" height="14" rx="2" fill="url(#dashGrad)"/>
                         <path d="M3 10h2V7H3v3zm3-3h2V4H6v3zm3 3h2V7H9v3z" fill="white"/>
                       </svg>
                     </div>
                     <span className="text-[10px] text-[#ccc] font-medium">dashboard.kovodesign.com</span>
                   </div>

                   {/* Right Controls */}
                   <div className="flex items-center gap-1">
                     <button className="p-1 hover:bg-[#2a2a2a] rounded">
                       <RotateCw className="w-3.5 h-3.5 text-[#888]" />
                     </button>
                     <button className="p-1 hover:bg-[#2a2a2a] rounded">
                       <BookmarkPlus className="w-3.5 h-3.5 text-[#888]" />
                     </button>
                     <button className="p-1 hover:bg-[#2a2a2a] rounded">
                       <Share2 className="w-3.5 h-3.5 text-[#888]" />
                     </button>
                   </div>
                 </div>
               </div>

              <div className="relative aspect-[16/9] p-8 bg-[#0a0b0c] z-10">
                {/* Slide-out Menu Overlay */}
                {isMenuOpen && (
                  <div 
                    className="menu-overlay absolute inset-0 bg-black/60 backdrop-blur-sm z-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {/* Slide-out Menu Panel */}
                    <div 
                      className="menu-panel absolute left-0 top-0 bottom-0 w-64 bg-[#0f1011] border-r border-[#1f2023] shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Menu Header */}
                      <div className="flex items-center justify-between px-4 py-4 border-b border-[#1f2023]">
                        <span className="text-[#f7f8f8] font-semibold text-sm">Navigation</span>
                        <button 
                          className="p-1.5 hover:bg-[#1a1b1e] rounded-md transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <X className="w-4 h-4 text-[#71717a]" />
                        </button>
                      </div>

                      {/* Menu Items */}
                      <div className="p-3 space-y-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#1a1b1e] transition-colors text-left">
                          <HomeIcon className="w-4 h-4 text-[#6366f1]" />
                          <span className="text-[#f7f8f8] text-sm">Home</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#1a1b1e] transition-colors text-left bg-[#1a1b1e]">
                          <LayoutDashboard className="w-4 h-4 text-[#6366f1]" />
                          <span className="text-[#f7f8f8] text-sm">Dashboard</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#1a1b1e] transition-colors text-left">
                          <BarChart3 className="w-4 h-4 text-[#71717a]" />
                          <span className="text-[#a1a1aa] text-sm">Analytics</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#1a1b1e] transition-colors text-left">
                          <FolderKanban className="w-4 h-4 text-[#71717a]" />
                          <span className="text-[#a1a1aa] text-sm">Projects</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#1a1b1e] transition-colors text-left">
                          <FileText className="w-4 h-4 text-[#71717a]" />
                          <span className="text-[#a1a1aa] text-sm">Reports</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#1a1b1e] transition-colors text-left">
                          <Users className="w-4 h-4 text-[#71717a]" />
                          <span className="text-[#a1a1aa] text-sm">Customers</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#1a1b1e] transition-colors text-left">
                          <Package className="w-4 h-4 text-[#71717a]" />
                          <span className="text-[#a1a1aa] text-sm">Products</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#1a1b1e] transition-colors text-left">
                          <CreditCard className="w-4 h-4 text-[#71717a]" />
                          <span className="text-[#a1a1aa] text-sm">Billing</span>
                        </button>
                        
                        {/* Divider */}
                        <div className="my-2 border-t border-[#1f2023]"></div>
                        
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#1a1b1e] transition-colors text-left">
                          <Settings className="w-4 h-4 text-[#71717a]" />
                          <span className="text-[#a1a1aa] text-sm">Settings</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#1a1b1e] transition-colors text-left">
                          <HelpCircle className="w-4 h-4 text-[#71717a]" />
                          <span className="text-[#a1a1aa] text-sm">Help & Support</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sidebar + Content Layout */}
                <div className="flex gap-5 h-full">
                  {/* Sidebar */}
                  <div className="w-52 space-y-1">
                    {/* Logo with Burger Menu */}
                    <div className="flex items-center gap-2 px-3 py-4 mb-4">
                      <button 
                        className="p-1.5 hover:bg-[#1a1b1e] rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(true)}
                      >
                        <Menu className="w-4 h-4 text-[#71717a]" />
                      </button>
                      <span className="text-[#f7f8f8] font-semibold text-sm">Analytics</span>
                    </div>
                     
                     {/* Navigation Items */}
                     <div className="space-y-0.5">
                       <div className="dashboard-nav-item active flex items-center gap-3 px-3 py-2 rounded-md">
                         <LayoutDashboard className="w-4 h-4 text-[#6366f1]" />
                         <span className="text-[#f7f8f8] text-xs font-medium">Dashboard</span>
                       </div>
                       <div className="dashboard-nav-item flex items-center gap-3 px-3 py-2 rounded-md">
                         <BarChart3 className="w-4 h-4 text-[#71717a]" />
                         <span className="text-[#a1a1aa] text-xs">Analytics</span>
                       </div>
                       <div className="dashboard-nav-item flex items-center gap-3 px-3 py-2 rounded-md">
                         <FileText className="w-4 h-4 text-[#71717a]" />
                         <span className="text-[#a1a1aa] text-xs">Reports</span>
                       </div>
                       <div className="dashboard-nav-item flex items-center gap-3 px-3 py-2 rounded-md">
                         <Users className="w-4 h-4 text-[#71717a]" />
                         <span className="text-[#a1a1aa] text-xs">Customers</span>
                       </div>
                       <div className="dashboard-nav-item flex items-center gap-3 px-3 py-2 rounded-md">
                         <Settings className="w-4 h-4 text-[#71717a]" />
                         <span className="text-[#a1a1aa] text-xs">Settings</span>
                       </div>
                     </div>
                   </div>
 
                   {/* Main Content */}
                   <div className="flex-1 space-y-4 overflow-hidden">
                     {/* Header */}
                     <div className="flex items-center justify-between">
                       <div>
                         <h1 className="text-[#f7f8f8] text-xl font-semibold mb-0.5">Revenue Overview</h1>
                         <p className="text-[#71717a] text-xs">Track your business performance</p>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="px-3 py-1.5 bg-[#1a1b1e] border border-[#27272a] rounded-md text-[#a1a1aa] text-xs">
                           Last 30 days
                         </div>
                         
                         {/* User Account Menu */}
                         <div className="flex items-center gap-2">
                           {/* Notifications */}
                           <button className="relative p-1.5 hover:bg-[#1a1b1e] rounded-md transition-colors">
                             <Bell className="w-4 h-4 text-[#71717a]" />
                             <div className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full"></div>
                           </button>
                           
                           {/* User Avatar */}
                           <button className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#1a1b1e] rounded-md transition-colors">
                             <div className="w-6 h-6 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center">
                               <User className="w-3.5 h-3.5 text-white" />
                             </div>
                             <span className="text-[#f7f8f8] text-xs font-medium">Sarah M.</span>
                           </button>
                         </div>
                       </div>
                     </div>

                     {/* Stats Cards */}
                     <div className="grid grid-cols-3 gap-3">
                       {/* Total Revenue */}
                       <div className="dashboard-card-hover bg-[#0f1011] border border-[#1f2023] rounded-lg p-4 cursor-pointer">
                         <div className="flex items-center justify-between mb-3">
                           <span className="text-[#71717a] text-xs font-medium">Total Revenue</span>
                           <div className="w-8 h-8 bg-[#1a1b1e] rounded-md flex items-center justify-center">
                             <TrendingUp className="w-4 h-4 text-[#22c55e]" />
                           </div>
                         </div>
                         <div className="text-[#f7f8f8] text-2xl font-bold mb-1">$45,231</div>
                         <div className="flex items-center gap-1">
                           <span className="text-[#22c55e] text-xs font-medium">+20.1%</span>
                           <span className="text-[#52525b] text-xs">from last month</span>
                         </div>
                       </div>

                       {/* Active Users */}
                       <div className="dashboard-card-hover bg-[#0f1011] border border-[#1f2023] rounded-lg p-4 cursor-pointer">
                         <div className="flex items-center justify-between mb-3">
                           <span className="text-[#71717a] text-xs font-medium">Active Users</span>
                           <div className="w-8 h-8 bg-[#1a1b1e] rounded-md flex items-center justify-center">
                             <UserCheck className="w-4 h-4 text-[#6366f1]" />
                           </div>
                         </div>
                         <div className="text-[#f7f8f8] text-2xl font-bold mb-1">2,350</div>
                         <div className="flex items-center gap-1">
                           <span className="text-[#22c55e] text-xs font-medium">+12.5%</span>
                           <span className="text-[#52525b] text-xs">from last month</span>
                         </div>
                       </div>

                       {/* Conversion Rate */}
                       <div className="dashboard-card-hover bg-[#0f1011] border border-[#1f2023] rounded-lg p-4 cursor-pointer">
                         <div className="flex items-center justify-between mb-3">
                           <span className="text-[#71717a] text-xs font-medium">Conversion</span>
                           <div className="w-8 h-8 bg-[#1a1b1e] rounded-md flex items-center justify-center">
                             <Target className="w-4 h-4 text-[#f59e0b]" />
                           </div>
                         </div>
                         <div className="text-[#f7f8f8] text-2xl font-bold mb-1">3.24%</div>
                         <div className="flex items-center gap-1">
                           <span className="text-[#ef4444] text-xs font-medium">-4.3%</span>
                           <span className="text-[#52525b] text-xs">from last month</span>
                         </div>
                       </div>
                     </div>

                     {/* Chart Area */}
                     <div className="bg-[#0f1011] border border-[#1f2023] rounded-lg p-5 flex-1">
                       <div className="flex items-center justify-between mb-4">
                         <h3 className="text-[#f7f8f8] text-sm font-semibold">Revenue Trend</h3>
                         <div className="flex items-center gap-3">
                           <div className="flex items-center gap-1.5">
                             <div className="w-2.5 h-2.5 bg-[#6366f1] rounded-full"></div>
                             <span className="text-[#71717a] text-xs">Revenue</span>
                           </div>
                           <div className="flex items-center gap-1.5">
                             <div className="w-2.5 h-2.5 bg-[#8b5cf6] rounded-full"></div>
                             <span className="text-[#71717a] text-xs">Profit</span>
                           </div>
                         </div>
                       </div>
                       
                       {/* Line Chart with Recharts */}
                       <div className="h-32">
                         <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={revenueData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                             <defs>
                               <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                               </linearGradient>
                             </defs>
                             <CartesianGrid 
                               strokeDasharray="0" 
                               stroke="#1f2023" 
                               vertical={false}
                             />
                             <XAxis 
                               dataKey="month" 
                               stroke="#52525b"
                               tick={{ fill: '#52525b', fontSize: 9 }}
                               tickLine={false}
                               axisLine={false}
                             />
                             <YAxis hide={true} />
                             <Tooltip 
                               contentStyle={{ 
                                 backgroundColor: '#1a1b1e', 
                                 border: '1px solid #27272a',
                                 borderRadius: '6px',
                                 fontSize: '11px'
                               }}
                               labelStyle={{ color: '#f7f8f8' }}
                               itemStyle={{ color: '#d0d6e0' }}
                             />
                             <Area 
                               type="monotone" 
                               dataKey="revenue" 
                               stroke="#6366f1" 
                               strokeWidth={2.5}
                               fill="url(#colorRevenue)"
                               dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }}
                               activeDot={{ r: 4, fill: '#818cf8' }}
                             />
                             <Line 
                               type="monotone" 
                               dataKey="profit" 
                               stroke="#8b5cf6" 
                               strokeWidth={2}
                               strokeDasharray="4 4"
                               dot={false}
                             />
                           </AreaChart>
                         </ResponsiveContainer>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative z-10 pt-24 pb-0 bg-dark-secondary section-fade-top overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-[680] text-[#f7f8f8] mb-4">
              Modern Tech Stack
            </h2>
            <p className="text-lg text-[#d0d6e0]">
              Built with the latest tools and technologies
            </p>
          </div>
        </div>

        {/* Infinite Marquee Container - Full Width */}
        <div className="relative w-full z-10">
          {/* Dark Gray Background with Gradient Fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#151515] to-[#1a1a1a] opacity-60"></div>

          {/* Gradient Fade Top */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0d0e0f] to-transparent z-20 pointer-events-none"></div>
          {/* Gradient Fade Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08090a] to-transparent z-20 pointer-events-none"></div>
          {/* Gradient Fade Left */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0d0e0f] to-transparent z-20 pointer-events-none"></div>
          {/* Gradient Fade Right */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0d0e0f] to-transparent z-20 pointer-events-none"></div>

          {/* Marquee Wrapper - Extended padding for glow visibility */}
          <div className="relative flex overflow-x-hidden overflow-y-visible py-8" style={{ border: 'none', outline: 'none' }}>
            <div className="flex animate-marquee gap-16 whitespace-nowrap" style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}>
                {/* Technology Items - Repeated twice for seamless loop */}
                {[...Array(2)].map((_, setIndex) => (
                  <React.Fragment key={setIndex}>
                    {/* Next.js */}
                    <div className="flex flex-col items-center justify-center px-8 py-6 group cursor-pointer">
                      <div className="w-20 h-20 mb-3 text-[#888] opacity-60 group-hover:text-[#f7f8f8] group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <mask id="nextjs-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                            <circle cx="90" cy="90" r="90" fill="white"/>
                          </mask>
                          <g mask="url(#nextjs-mask)">
                            <circle cx="90" cy="90" r="87" stroke="currentColor" strokeWidth="6" fill="none"/>
                            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="currentColor"/>
                            <rect x="115" y="54" width="12" height="72" fill="currentColor"/>
                          </g>
                        </svg>
                      </div>
                      <span className="text-[#888] group-hover:text-[#f7f8f8] transition-all duration-300 text-sm font-medium">Next.js</span>
                    </div>
                    {/* Tailwind CSS */}
                    <div className="flex flex-col items-center justify-center px-8 py-6 group cursor-pointer">
                      <div className="w-20 h-20 mb-3 text-[#888] opacity-60 group-hover:text-[#f7f8f8] group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        <svg viewBox="0 0 54 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <path d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.055.513 3.51 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.055-.513-3.51-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.055.514 3.51 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.055-.513-3.51-2.004-5.147-3.652C23.256 19.31 20.192 16.2 13.5 16.2z" fill="currentColor"/>
                        </svg>
                      </div>
                      <span className="text-[#888] group-hover:text-[#f7f8f8] transition-all duration-300 text-sm font-medium">Tailwind CSS</span>
                    </div>
                    {/* TypeScript */}
                    <div className="flex flex-col items-center justify-center px-8 py-6 group cursor-pointer">
                      <div className="w-20 h-20 mb-3 text-[#888] opacity-60 group-hover:text-[#f7f8f8] group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <rect fill="currentColor" height="512" rx="50" width="512" opacity="0.1"/>
                          <path clipRule="evenodd" d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z" fill="currentColor" fillRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-[#888] group-hover:text-[#f7f8f8] transition-all duration-300 text-sm font-medium">TypeScript</span>
                    </div>
                    {/* React */}
                    <div className="flex flex-col items-center justify-center px-8 py-6 group cursor-pointer">
                      <div className="w-20 h-20 mb-3 text-[#888] opacity-60 group-hover:text-[#f7f8f8] group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        <svg viewBox="0 0 841.9 595.3" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <ellipse cx="420.9" cy="297.6" rx="140.9" ry="240.2" fill="none" stroke="currentColor" strokeWidth="20"/>
                          <ellipse cx="420.9" cy="297.6" rx="140.9" ry="240.2" fill="none" stroke="currentColor" strokeWidth="20" transform="rotate(60 420.9 297.6)"/>
                          <ellipse cx="420.9" cy="297.6" rx="140.9" ry="240.2" fill="none" stroke="currentColor" strokeWidth="20" transform="rotate(120 420.9 297.6)"/>
                          <circle cx="420.9" cy="297.6" r="32" fill="currentColor"/>
                        </svg>
                      </div>
                      <span className="text-[#888] group-hover:text-[#f7f8f8] transition-all duration-300 text-sm font-medium">React</span>
                    </div>
                    {/* Node.js */}
                    <div className="flex flex-col items-center justify-center px-8 py-6 group cursor-pointer">
                      <div className="w-20 h-20 mb-3 text-[#888] opacity-60 group-hover:text-[#f7f8f8] group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        <svg viewBox="0 0 256 289" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.156.796-.53 1.856-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915l-105.74-60.953c-1.06-.53-2.385-.53-3.18 0L20.405 80.166c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.636 7.95 25.44-1.325 25.44-10.6V93.68c0-1.59 1.326-3.18 3.181-3.18h13.516c1.59 0 3.18 1.325 3.18 3.18v120.58c0 20.936-11.396 33.126-31.272 33.126-6.095 0-10.865 0-24.38-6.625l-27.827-15.9C4.24 220.885 0 213.465 0 205.515V83.346C0 75.396 4.24 67.976 11.13 64L116.87 2.783c6.626-3.71 15.635-3.71 22.26 0L244.87 64C251.76 67.975 256 75.395 256 83.346v122.17c0 7.95-4.24 15.37-11.13 19.345L139.13 286.08c-3.445 1.59-7.42 2.385-11.13 2.385zm32.596-84.009c-46.377 0-55.917-21.2-55.917-39.221 0-1.59 1.325-3.18 3.18-3.18h13.78c1.59 0 2.916 1.06 2.916 2.65 2.12 14.045 8.215 20.936 36.306 20.936 22.26 0 31.802-5.035 31.802-16.96 0-6.891-2.65-11.926-37.367-15.372-28.886-2.915-46.907-9.275-46.907-32.33 0-21.467 18.022-34.186 48.232-34.186 33.921 0 50.617 11.66 52.737 37.101 0 .795-.265 1.59-.795 2.385-.53.53-1.325 1.06-2.12 1.06h-13.78c-1.326 0-2.65-1.06-2.916-2.385-3.18-14.575-11.395-19.345-33.126-19.345-24.38 0-27.296 8.48-27.296 14.84 0 7.686 3.445 10.07 36.306 14.31 32.597 4.24 47.967 10.336 47.967 33.127-.265 23.321-19.345 36.571-53.002 36.571z" fill="currentColor"/>
                        </svg>
                      </div>
                      <span className="text-[#888] group-hover:text-[#f7f8f8] transition-all duration-300 text-sm font-medium">Node.js</span>
                    </div>
                    {/* Framer Motion */}
                    <div className="flex flex-col items-center justify-center px-8 py-6 group cursor-pointer">
                      <div className="w-20 h-20 mb-3 text-[#888] opacity-60 group-hover:text-[#f7f8f8] group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="currentColor"/>
                        </svg>
                      </div>
                      <span className="text-[#888] group-hover:text-[#f7f8f8] transition-all duration-300 text-sm font-medium">Framer</span>
                    </div>
                    {/* Vercel */}
                    <div className="flex flex-col items-center justify-center px-8 py-6 group cursor-pointer">
                      <div className="w-20 h-20 mb-3 text-[#888] opacity-60 group-hover:text-[#f7f8f8] group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        <svg viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <span className="text-[#888] group-hover:text-[#f7f8f8] transition-all duration-300 text-sm font-medium">Vercel</span>
                    </div>
                    {/* Prisma */}
                    <div className="flex flex-col items-center justify-center px-8 py-6 group cursor-pointer">
                      <div className="w-20 h-20 mb-3 text-[#888] opacity-60 group-hover:text-[#f7f8f8] group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <path d="M34.06 33.2L21.326 6.036a2.093 2.093 0 0 0-3.752-.066l-11.632 23.79a2.106 2.106 0 0 0 1.573 2.995l24.263 3.541a2.106 2.106 0 0 0 2.282-3.096Zm-13.26-23.261a.66.66 0 0 1 1.183.021l12.734 27.164a.659.659 0 0 1-.713.97l-24.263-3.541a.659.659 0 0 1-.493-.937l11.632-23.79Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <span className="text-[#888] group-hover:text-[#f7f8f8] transition-all duration-300 text-sm font-medium">Prisma</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
      </section>

      {/* Services Section - Style 2: Split Description */}
      <section 
        className="relative z-10 py-32 px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 bg-dark-primary section-fade-top section-fade-bottom"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '60px 60px'
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-[680] text-[#f7f8f8] mb-6 tracking-tight">
              What we do
            </h2>
            <p className="text-xl text-[#d0d6e0] max-w-2xl mx-auto leading-relaxed">
              We craft beautiful, functional products that people actually want to use
            </p>
          </div>

          {/* Service 1: Product Design - Image Left, Text Right */}
          <div 
            ref={service1Ref}
            data-section-id="service-1"
            className={`flex flex-col lg:flex-row items-center gap-16 mb-40 group service-item transition-all duration-500 ${
              focusedSection === 'service-1' ? 'section-focused' : ''
            }`}
          >
            {/* Image/Visual Left */}
            <div className="w-full lg:w-1/2 flex-shrink-0">
              <div 
                ref={mockup1Ref}
                data-mockup-id="mockup-1"
                className={`relative bg-gradient-to-br from-[#1a1b1e] via-[#151617] to-[#0d0e0f] rounded-2xl border border-[#23252a] p-10 overflow-hidden shadow-2xl hover:border-[#2a2d33] transition-all duration-500 ${
                  visibleMockups.has('mockup-1') ? 'mockup-visible' : 'mockup-hidden'
                }`}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#8b5cf6]/5 opacity-50"></div>
                
                {/* UI Mockup Preview */}
                <div className="relative z-10">
                  {/* Browser window mockup */}
                  <div className="bg-[#08090a] rounded-xl border border-[#23252a] overflow-hidden shadow-xl">
                    {/* Browser Chrome */}
                    <div className="bg-[#1a1b1e] px-5 py-3 flex items-center gap-3 border-b border-[#23252a]">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                      </div>
                      <div className="flex-1 flex items-center gap-2 bg-[#08090a] rounded-md px-3 py-1.5 border border-[#23252a] mx-3">
                        <div className="w-3 h-3 bg-[#6366f1] rounded-sm"></div>
                        <div className="flex-1 h-4 bg-[#23252a] rounded w-full"></div>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-6 h-6 rounded bg-[#23252a]"></div>
                        <div className="w-6 h-6 rounded bg-[#23252a]"></div>
                      </div>
                    </div>
                    {/* Content Area */}
                    <div className="p-8 space-y-6 bg-gradient-to-br from-[#0a0b0c] to-[#08090a]">
                      {/* Navigation Bar */}
                      <div className="flex items-center gap-6 pb-4 border-b border-[#23252a]">
                        <div className="h-7 bg-[#6366f1]/20 rounded-md px-3 flex items-center">
                          <div className="h-2 bg-[#6366f1]/40 rounded w-12"></div>
                        </div>
                        <div className="h-5 bg-[#23252a] rounded-md w-14"></div>
                        <div className="h-5 bg-[#23252a] rounded-md w-14"></div>
                        <div className="h-5 bg-[#23252a] rounded-md w-14"></div>
                        <div className="ml-auto h-5 bg-[#23252a] rounded-full w-8"></div>
                      </div>
                      
                      {/* Header Section */}
                      <div className="space-y-3">
                        <div className="h-9 bg-[#1a1b1e] rounded-lg w-3/4 border border-[#23252a]"></div>
                        <div className="flex items-center gap-3">
                          <div className="h-4 bg-[#23252a] rounded w-2/3"></div>
                          <div className="h-4 bg-[#23252a] rounded w-1/3"></div>
                        </div>
                      </div>
                      
                      {/* Card Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-[#6366f1]/15 to-[#6366f1]/5 rounded-xl border border-[#23252a]/50 p-5 backdrop-blur-sm hover:border-[#6366f1]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366f1]/10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#6366f1]/60 rounded-lg shadow-lg shadow-[#6366f1]/20 flex items-center justify-center">
                              <div className="w-5 h-5 bg-white/20 rounded"></div>
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="h-3 bg-[#6366f1]/30 rounded-md w-4/5"></div>
                              <div className="h-2 bg-[#23252a] rounded w-3/5"></div>
                            </div>
                          </div>
                          <div className="h-24 bg-gradient-to-br from-[#6366f1]/15 via-[#6366f1]/5 to-transparent rounded-lg border border-[#6366f1]/20 p-3 flex items-end">
                            <div className="w-full space-y-2">
                              <div className="h-2 bg-[#6366f1]/20 rounded w-full"></div>
                              <div className="h-2 bg-[#6366f1]/20 rounded w-3/4"></div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#8b5cf6]/15 to-[#8b5cf6]/5 rounded-xl border border-[#23252a]/50 p-5 backdrop-blur-sm hover:border-[#8b5cf6]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#8b5cf6]/10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#8b5cf6] to-[#8b5cf6]/60 rounded-lg shadow-lg shadow-[#8b5cf6]/20 flex items-center justify-center">
                              <div className="w-5 h-5 bg-white/20 rounded"></div>
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="h-3 bg-[#8b5cf6]/30 rounded-md w-4/5"></div>
                              <div className="h-2 bg-[#23252a] rounded w-3/5"></div>
                            </div>
                          </div>
                          <div className="h-24 bg-gradient-to-br from-[#8b5cf6]/15 via-[#8b5cf6]/5 to-transparent rounded-lg border border-[#8b5cf6]/20 p-3 flex items-end">
                            <div className="w-full space-y-2">
                              <div className="h-2 bg-[#8b5cf6]/20 rounded w-full"></div>
                              <div className="h-2 bg-[#8b5cf6]/20 rounded w-3/4"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats Row */}
                      <div className="flex gap-4 pt-4 border-t border-[#23252a]">
                        <div className="flex-1 bg-[#08090a] rounded-lg p-3 border border-[#23252a]">
                          <div className="h-6 bg-[#23252a] rounded-md w-20 mb-2"></div>
                          <div className="h-3 bg-[#1a1b1e] rounded w-16"></div>
                        </div>
                        <div className="flex-1 bg-[#08090a] rounded-lg p-3 border border-[#23252a]">
                          <div className="h-6 bg-[#23252a] rounded-md w-20 mb-2"></div>
                          <div className="h-3 bg-[#1a1b1e] rounded w-16"></div>
                        </div>
                        <div className="flex-1 bg-[#08090a] rounded-lg p-3 border border-[#23252a]">
                          <div className="h-6 bg-[#23252a] rounded-md w-20 mb-2"></div>
                          <div className="h-3 bg-[#1a1b1e] rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content Right */}
            <div className="w-full lg:w-1/2 lg:pl-8">
              <h3 className="text-4xl md:text-5xl font-[680] text-[#f7f8f8] mb-6 tracking-tight leading-tight">
                Product Design
              </h3>
              <p className="text-lg md:text-xl text-[#d0d6e0] mb-8 leading-relaxed">
                We craft beautiful, user-centered interfaces that drive results. From research to final implementation, we design products that people actually want to use.
              </p>
              <ul className="space-y-4 mb-10 text-[#d0d6e0]">
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6366f1] flex-shrink-0"></div>
                  <span className="text-base md:text-lg">User research & testing</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6366f1] flex-shrink-0"></div>
                  <span className="text-base md:text-lg">UI/UX design</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6366f1] flex-shrink-0"></div>
                  <span className="text-base md:text-lg">Wireframes & prototypes</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6366f1] flex-shrink-0"></div>
                  <span className="text-base md:text-lg">Design systems</span>
                </li>
              </ul>
              <a href="/services" className="inline-flex items-center gap-2 text-[#6366f1] hover:text-[#8b5cf6] transition-colors font-semibold text-base group/link">
                <span>Learn more</span>
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Service 2: Frontend Development - Text Left, Image Right */}
          <div 
            ref={service2Ref}
            data-section-id="service-2"
            className={`flex flex-col lg:flex-row-reverse items-center gap-16 mb-40 group service-item transition-all duration-500 ${
              focusedSection === 'service-2' ? 'section-focused' : ''
            }`}
          >
            {/* Image/Visual Right */}
            <div className="w-full lg:w-1/2 flex-shrink-0">
              <div 
                ref={mockup2Ref}
                data-mockup-id="mockup-2"
                className={`relative bg-gradient-to-br from-[#1a1b1e] via-[#151617] to-[#0d0e0f] rounded-2xl border border-[#23252a] p-10 overflow-hidden shadow-2xl hover:border-[#2a2d33] transition-all duration-500 ${
                  visibleMockups.has('mockup-2') ? 'mockup-visible' : 'mockup-hidden'
                }`}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 via-transparent to-[#6366f1]/5 opacity-50"></div>
                
                {/* Code Preview */}
                <div className="relative z-10">
                  {/* Code Editor Window */}
                  <div className="bg-[#08090a] rounded-xl border border-[#23252a] overflow-hidden shadow-xl">
                    {/* Editor Chrome */}
                    <div className="bg-[#1a1b1e] px-5 py-3 flex items-center gap-3 border-b border-[#23252a]">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex gap-1.5 ml-4">
                          <div className="w-5 h-5 bg-[#23252a] rounded"></div>
                          <div className="w-5 h-5 bg-[#23252a] rounded"></div>
                          <div className="w-5 h-5 bg-[#23252a] rounded"></div>
                        </div>
                        <span className="text-xs text-[#888] ml-auto font-mono">App.tsx</span>
                      </div>
                    </div>
                    {/* Code Content */}
                    <div className="p-8 font-mono text-sm bg-gradient-to-br from-[#0a0b0c] to-[#08090a]">
                      <div className="space-y-3 text-[#d0d6e0]">
                        <div className="flex items-center gap-4">
                          <span className="text-[#5c6370] w-8 text-right">1</span>
                          <span><span className="text-[#c678dd]">import</span> <span className="text-[#98c379]">React</span> <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'react'</span></span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[#5c6370] w-8 text-right">2</span>
                          <span><span className="text-[#c678dd]">import</span> <span className="text-[#98c379]">{'{'}</span> <span className="text-[#61afef]">useState</span> <span className="text-[#98c379">{'}'}</span> <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'react'</span></span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[#5c6370] w-8 text-right">3</span>
                          <span></span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[#5c6370] w-8 text-right">4</span>
                          <span><span className="text-[#c678dd]">export default function</span> <span className="text-[#61afef]">App</span><span>()</span> <span className="text-[#c678dd]">{'{'}</span></span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[#5c6370] w-8 text-right">5</span>
                          <span className="ml-4"><span className="text-[#c678dd]">return</span> <span className="text-[#c678dd]">&lt;</span><span className="text-[#e06c75]">div</span><span className="text-[#c678dd]">&gt;</span></span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[#5c6370] w-8 text-right">6</span>
                          <span className="ml-8"><span className="text-[#c678dd]">&lt;</span><span className="text-[#e06c75]">h1</span><span className="text-[#c678dd]">&gt;</span><span className="text-[#98c379]">Hello World</span><span className="text-[#c678dd]">&lt;/</span><span className="text-[#e06c75]">h1</span><span className="text-[#c678dd]">&gt;</span></span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[#5c6370] w-8 text-right">7</span>
                          <span className="ml-4"><span className="text-[#c678dd]">&lt;/</span><span className="text-[#e06c75]">div</span><span className="text-[#c678dd]">&gt;</span></span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[#5c6370] w-8 text-right">8</span>
                          <span><span className="text-[#c678dd">{'}'}</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content Left */}
            <div className="w-full lg:w-1/2 lg:pr-8">
              <h3 className="text-4xl md:text-5xl font-[680] text-[#f7f8f8] mb-6 tracking-tight leading-tight">
                Frontend Development
              </h3>
              <p className="text-lg md:text-xl text-[#d0d6e0] mb-8 leading-relaxed">
                Fast, modern web apps built with the latest technologies. We write clean, maintainable code that performs well and scales with your business.
              </p>
              <ul className="space-y-4 mb-10 text-[#d0d6e0]">
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8b5cf6] flex-shrink-0"></div>
                  <span className="text-base md:text-lg">React & Next.js applications</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8b5cf6] flex-shrink-0"></div>
                  <span className="text-base md:text-lg">TypeScript for type safety</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8b5cf6] flex-shrink-0"></div>
                  <span className="text-base md:text-lg">Responsive & accessible</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8b5cf6] flex-shrink-0"></div>
                  <span className="text-base md:text-lg">Performance optimization</span>
                </li>
              </ul>
              <a href="/services" className="inline-flex items-center gap-2 text-[#8b5cf6] hover:text-[#6366f1] transition-colors font-semibold text-base group/link">
                <span>Learn more</span>
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </a>
        </div>
          </div>

          {/* Service 3: Design Systems - Image Left, Text Right */}
          <div 
            ref={service3Ref}
            data-section-id="service-3"
            className={`flex flex-col lg:flex-row items-center gap-16 group service-item transition-all duration-500 ${
              focusedSection === 'service-3' ? 'section-focused' : ''
            }`}
          >
            {/* Image/Visual Left */}
            <div className="w-full lg:w-1/2 flex-shrink-0">
              <div 
                ref={mockup3Ref}
                data-mockup-id="mockup-3"
                className={`relative bg-gradient-to-br from-[#1a1b1e] via-[#151617] to-[#0d0e0f] rounded-2xl border border-[#23252a] p-10 overflow-hidden shadow-2xl hover:border-[#2a2d33] transition-all duration-500 ${
                  visibleMockups.has('mockup-3') ? 'mockup-visible' : 'mockup-hidden'
                }`}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ec4899]/5 via-transparent to-[#6366f1]/5 opacity-50"></div>
                
                {/* Component Library Preview */}
                <div className="relative z-10 space-y-6">
                  {/* Component Cards Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#08090a] rounded-xl border border-[#23252a] p-5 hover:border-[#6366f1]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366f1]/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-[#6366f1]/20 rounded-lg border border-[#6366f1]/30"></div>
                        <div className="flex-1 space-y-1.5">
                          <div className="h-2 bg-[#6366f1]/20 rounded w-3/4"></div>
                          <div className="h-1.5 bg-[#23252a] rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="h-10 bg-gradient-to-r from-[#6366f1] to-[#6366f1]/60 rounded-lg shadow-md shadow-[#6366f1]/20"></div>
                    </div>
                    <div className="bg-[#08090a] rounded-xl border border-[#23252a] p-5 hover:border-[#8b5cf6]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#8b5cf6]/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-[#8b5cf6]/20 rounded-lg border border-[#8b5cf6]/30"></div>
                        <div className="flex-1 space-y-1.5">
                          <div className="h-2 bg-[#8b5cf6]/20 rounded w-3/4"></div>
                          <div className="h-1.5 bg-[#23252a] rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="h-10 bg-gradient-to-r from-[#8b5cf6] to-[#8b5cf6]/60 rounded-lg shadow-md shadow-[#8b5cf6]/20"></div>
                    </div>
                    <div className="bg-[#08090a] rounded-xl border-2 border-[#6366f1]/40 p-5 hover:border-[#6366f1]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366f1]/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-transparent rounded-lg border-2 border-[#6366f1]"></div>
                        <div className="flex-1 space-y-1.5">
                          <div className="h-2 bg-[#6366f1]/20 rounded w-3/4"></div>
                          <div className="h-1.5 bg-[#23252a] rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="h-10 bg-transparent border-2 border-[#6366f1] rounded-lg"></div>
                    </div>
                    <div className="bg-[#08090a] rounded-xl border border-[#23252a] p-5 hover:border-[#ec4899]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#ec4899]/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-[#ec4899]/20 rounded-lg border border-[#ec4899]/30"></div>
                        <div className="flex-1 space-y-1.5">
                          <div className="h-2 bg-[#ec4899]/20 rounded w-3/4"></div>
                          <div className="h-1.5 bg-[#23252a] rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="h-10 bg-gradient-to-r from-[#ec4899] to-[#ec4899]/60 rounded-lg shadow-md shadow-[#ec4899]/20"></div>
                    </div>
                  </div>
                  
                  {/* Design Tokens Showcase */}
                  <div className="bg-[#08090a] rounded-xl border border-[#23252a] p-6 hover:border-[#6366f1]/30 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#ec4899] shadow-lg shadow-[#6366f1]/30 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm"></div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-[#1a1b1e] rounded-lg w-2/3"></div>
                        <div className="h-2 bg-[#23252a] rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[#23252a]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 bg-[#23252a] rounded w-20"></div>
                        <div className="h-2 bg-[#23252a] rounded w-16"></div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#6366f1]/20 border border-[#6366f1]/30 flex items-center justify-center">
                          <div className="w-6 h-6 bg-[#6366f1] rounded"></div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 flex items-center justify-center">
                          <div className="w-6 h-6 bg-[#8b5cf6] rounded"></div>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-[#ec4899]/20 border border-[#ec4899]/30 flex items-center justify-center">
                          <div className="w-6 h-6 bg-[#ec4899] rounded"></div>
                        </div>
                        <div className="flex-1 flex items-center justify-end gap-2">
                          <div className="h-6 bg-[#23252a] rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content Right */}
            <div className="w-full lg:w-1/2 lg:pl-8">
              <h3 className="text-4xl md:text-5xl font-[680] text-[#f7f8f8] mb-6 tracking-tight leading-tight">
                Design Systems
              </h3>
              <p className="text-lg md:text-xl text-[#d0d6e0] mb-8 leading-relaxed">
                Build consistent, scalable design systems that grow with your team. We create component libraries and documentation that developers love to use.
              </p>
              <ul className="space-y-4 mb-10 text-[#d0d6e0]">
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ec4899] flex-shrink-0"></div>
                  <span className="text-base md:text-lg">Component libraries</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ec4899] flex-shrink-0"></div>
                  <span className="text-base md:text-lg">Design tokens & variables</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ec4899] flex-shrink-0"></div>
                  <span className="text-base md:text-lg">Documentation & guidelines</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ec4899] flex-shrink-0"></div>
                  <span className="text-base md:text-lg">Figma to code workflows</span>
                </li>
              </ul>
              <a href="/services" className="inline-flex items-center gap-2 text-[#ec4899] hover:text-[#8b5cf6] transition-colors font-semibold text-base group/link">
                <span>Learn more</span>
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase Section - Bento Grid */}
      <section 
        className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 bg-dark-primary section-fade-top section-fade-bottom overflow-hidden"
        aria-labelledby="portfolio-heading"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-24">
            <h2 
              id="portfolio-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-[680] text-[#f7f8f8] mb-4 md:mb-6 tracking-tight"
            >
              Selected work
            </h2>
            <p className="text-lg md:text-xl text-[#d0d6e0] max-w-2xl mx-auto leading-relaxed">
              Internal projects and design explorations that showcase our approach
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Large Featured Card - Top Left */}
            <article 
              className="sm:col-span-2 lg:col-span-2 lg:row-span-2 group portfolio-card"
              tabIndex={0}
              role="article"
              aria-label="Analytics Dashboard - Featured Project"
            >
              <div className="relative h-full bg-gradient-to-br from-[#1a1b1e] via-[#151617] to-[#0d0e0f] rounded-xl md:rounded-2xl border border-[#23252a] p-6 md:p-8 overflow-hidden transition-all duration-300 hover:border-[#6366f1]/40 hover:shadow-2xl hover:shadow-[#6366f1]/10 focus-within:border-[#6366f1]/40 focus-within:shadow-2xl focus-within:shadow-[#6366f1]/10 focus-within:outline-none">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/10 via-transparent to-[#8b5cf6]/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Badge */}
                  <div className="inline-block px-2.5 md:px-3 py-1 md:py-1.5 bg-[#6366f1]/20 border border-[#6366f1]/30 rounded-lg w-fit mb-4 md:mb-6">
                    <span className="text-xs font-semibold text-[#6366f1] uppercase tracking-wide">Featured Project</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-[680] text-[#f7f8f8] mb-3 md:mb-4 tracking-tight">
                    Analytics Dashboard
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg text-[#d0d6e0] mb-6 md:mb-8 leading-relaxed flex-1">
                    A comprehensive data visualization platform with real-time metrics and interactive charts.
                  </p>

                  {/* Mockup Preview */}
                  <div className="relative bg-[#08090a] rounded-xl border border-[#23252a] overflow-hidden shadow-xl">
                    {/* Browser Chrome */}
                    <div className="bg-[#1a1b1e] px-4 py-2.5 flex items-center gap-2 border-b border-[#23252a]">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
                      </div>
                      <div className="flex-1 flex items-center gap-2 bg-[#08090a] rounded-md px-2.5 py-1 border border-[#23252a] mx-2">
                        <Lock className="w-3 h-3 text-[#888]" />
                        <div className="w-3 h-3 bg-[#6366f1] rounded-sm"></div>
                        <div className="flex-1 h-3 bg-[#23252a] rounded"></div>
                      </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="p-6 bg-gradient-to-br from-[#0a0b0c] to-[#08090a]">
                      {/* Stats Row */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="bg-[#1a1b1e] rounded-lg p-3 border border-[#23252a]">
                            <div className="h-2 bg-[#23252a] rounded w-16 mb-2"></div>
                            <div className="h-6 bg-[#6366f1]/20 rounded w-20"></div>
                          </div>
                        ))}
                      </div>

                      {/* Chart Area */}
                      <div className="bg-[#1a1b1e] rounded-lg p-4 border border-[#23252a] h-32">
                        <div className="h-full flex items-end gap-2">
                          {[45, 60, 38, 72, 55, 48, 65, 42].map((height, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-[#6366f1] to-[#6366f1]/40 rounded-t"
                              style={{ height: `${height}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-6">
                    <span className="text-xs text-[#888] font-medium">Built with:</span>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'Recharts'].map((tech) => (
                        <span key={tech} className="px-2.5 py-1 bg-[#23252a] border border-[#2a2d33] rounded-md text-xs text-[#d0d6e0]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Medium Card - Top Right */}
            <article 
              className="sm:col-span-2 lg:col-span-2 lg:row-span-1 group portfolio-card"
              tabIndex={0}
              role="article"
              aria-label="Component Library - Design System"
            >
              <div className="relative h-full bg-gradient-to-br from-[#1a1b1e] via-[#151617] to-[#0d0e0f] rounded-xl md:rounded-2xl border border-[#23252a] p-5 md:p-6 overflow-hidden transition-all duration-300 hover:border-[#8b5cf6]/40 hover:shadow-2xl hover:shadow-[#8b5cf6]/10 focus-within:border-[#8b5cf6]/40 focus-within:shadow-2xl focus-within:shadow-[#8b5cf6]/10 focus-within:outline-none">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 via-transparent to-[#ec4899]/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Badge */}
                  <div className="inline-block px-2.5 md:px-3 py-1 md:py-1.5 bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 rounded-lg w-fit mb-3 md:mb-4">
                    <span className="text-xs font-semibold text-[#8b5cf6] uppercase tracking-wide">Design System</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-[680] text-[#f7f8f8] mb-2 md:mb-3 tracking-tight">
                    Component Library
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-[#d0d6e0] mb-4 md:mb-6 leading-relaxed flex-1">
                    Scalable design system with reusable components and comprehensive documentation.
                  </p>

                  {/* Visual Preview */}
                  <div className="relative bg-[#08090a] rounded-xl border border-[#23252a] overflow-hidden shadow-xl flex-1">
                    <div className="p-4 space-y-3">
                      {/* Component Cards */}
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-[#1a1b1e] rounded-lg p-3 border border-[#23252a]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-lg"></div>
                            <div className="flex-1 space-y-1.5">
                              <div className="h-2 bg-[#23252a] rounded w-3/4"></div>
                              <div className="h-2 bg-[#23252a] rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-4">
                    <span className="text-xs text-[#888] font-medium">Built with:</span>
                    <div className="flex flex-wrap gap-2">
                      {['Figma', 'Storybook'].map((tech) => (
                        <span key={tech} className="px-2.5 py-1 bg-[#23252a] border border-[#2a2d33] rounded-md text-xs text-[#d0d6e0]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Small Card - Middle Right */}
            <article 
              className="sm:col-span-1 lg:col-span-1 group portfolio-card"
              tabIndex={0}
              role="article"
              aria-label="Mobile App"
            >
              <div className="relative h-full bg-gradient-to-br from-[#1a1b1e] via-[#151617] to-[#0d0e0f] rounded-xl md:rounded-2xl border border-[#23252a] p-5 md:p-6 overflow-hidden transition-all duration-300 hover:border-[#ec4899]/40 hover:shadow-2xl hover:shadow-[#ec4899]/10 focus-within:border-[#ec4899]/40 focus-within:shadow-2xl focus-within:shadow-[#ec4899]/10 focus-within:outline-none">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ec4899]/10 via-transparent to-[#6366f1]/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#ec4899] to-[#ec4899]/60 rounded-xl flex items-center justify-center mb-3 md:mb-4 shadow-lg shadow-[#ec4899]/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-[680] text-[#f7f8f8] mb-2 tracking-tight">
                    Mobile App
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#d0d6e0] leading-relaxed flex-1">
                    Native iOS and Android experience with modern UI patterns.
                  </p>
                </div>
              </div>
            </article>

            {/* Small Card - Bottom Right */}
            <article 
              className="sm:col-span-1 lg:col-span-1 group portfolio-card"
              tabIndex={0}
              role="article"
              aria-label="E-commerce"
            >
              <div className="relative h-full bg-gradient-to-br from-[#1a1b1e] via-[#151617] to-[#0d0e0f] rounded-xl md:rounded-2xl border border-[#23252a] p-5 md:p-6 overflow-hidden transition-all duration-300 hover:border-[#6366f1]/40 hover:shadow-2xl hover:shadow-[#6366f1]/10 focus-within:border-[#6366f1]/40 focus-within:shadow-2xl focus-within:shadow-[#6366f1]/10 focus-within:outline-none">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/10 via-transparent to-[#8b5cf6]/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#6366f1] to-[#6366f1]/60 rounded-xl flex items-center justify-center mb-3 md:mb-4 shadow-lg shadow-[#6366f1]/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 9H15V15H9V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-[680] text-[#f7f8f8] mb-2 tracking-tight">
                    E-commerce
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#d0d6e0] leading-relaxed flex-1">
                    High-converting product pages and checkout flows.
                  </p>
                </div>
              </div>
            </article>

            {/* Wide Card - Bottom */}
            <article 
              className="sm:col-span-2 lg:col-span-4 group portfolio-card"
              tabIndex={0}
              role="article"
              aria-label="Brand Identity System - Design Exploration"
            >
              <div className="relative h-full bg-gradient-to-br from-[#1a1b1e] via-[#151617] to-[#0d0e0f] rounded-xl md:rounded-2xl border border-[#23252a] p-6 md:p-8 overflow-hidden transition-all duration-300 hover:border-[#8b5cf6]/40 hover:shadow-2xl hover:shadow-[#8b5cf6]/10 focus-within:border-[#8b5cf6]/40 focus-within:shadow-2xl focus-within:shadow-[#8b5cf6]/10 focus-within:outline-none">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 via-transparent to-[#ec4899]/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 md:gap-8">
                  {/* Left: Text */}
                  <div className="flex-1 w-full lg:w-auto">
                    {/* Badge */}
                    <div className="inline-block px-2.5 md:px-3 py-1 md:py-1.5 bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 rounded-lg w-fit mb-4 md:mb-6">
                      <span className="text-xs font-semibold text-[#8b5cf6] uppercase tracking-wide">Design Exploration</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-[680] text-[#f7f8f8] mb-3 md:mb-4 tracking-tight">
                      Brand Identity System
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-[#d0d6e0] mb-4 md:mb-6 leading-relaxed">
                      Comprehensive visual identity including logo, typography, color palette, and brand guidelines.
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-[#888] font-medium">Tools:</span>
                      <div className="flex flex-wrap gap-2">
                        {['Figma', 'Illustrator', 'After Effects'].map((tech) => (
                          <span key={tech} className="px-2.5 py-1 bg-[#23252a] border border-[#2a2d33] rounded-md text-xs text-[#d0d6e0]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Visual Preview */}
                  <div className="w-full lg:w-2/5">
                    <div className="relative bg-[#08090a] rounded-xl border border-[#23252a] overflow-hidden shadow-xl">
                      {/* Brand Elements Preview */}
                      <div className="p-6 md:p-8 space-y-4 md:space-y-6">
                        {/* Logo Area */}
                        <div className="flex items-center justify-center">
                          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-[#6366f1]/30">
                            <span className="text-2xl md:text-3xl font-bold text-white">K</span>
                          </div>
                        </div>

                        {/* Color Palette */}
                        <div className="flex gap-2 md:gap-3 justify-center">
                          {['#6366f1', '#8b5cf6', '#ec4899', '#f7f8f8'].map((color, i) => (
                            <div
                              key={i}
                              className="w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-[#23252a]"
                              style={{ backgroundColor: color }}
                              aria-label={`Color ${i + 1}`}
                            ></div>
                          ))}
                        </div>

                        {/* Typography Preview */}
                        <div className="space-y-2">
                          <div className="h-3 md:h-4 bg-[#23252a] rounded w-3/4 mx-auto"></div>
                          <div className="h-2.5 md:h-3 bg-[#23252a] rounded w-2/3 mx-auto"></div>
                          <div className="h-2.5 md:h-3 bg-[#23252a] rounded w-1/2 mx-auto"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Footer - Linear Style */}
      <footer className="relative z-10 border-t border-[#23252a] bg-[#08090a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 py-14 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-8">
            {/* Logo Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
              <a href="/" className="flex items-center gap-2 w-fit">
                <div className="w-8 h-8 bg-[#f7f8f8] rounded-md flex items-center justify-center">
                  <span className="text-[#08090a] font-bold text-base">K</span>
                </div>
                <span className="text-[#f7f8f8] font-[590] text-[17px]">KOVO</span>
              </a>
            </div>

            {/* Company Column */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[#f7f8f8] text-[13px] font-[590] tracking-tight">Company</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="/about" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="/work" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    Work
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[#f7f8f8] text-[13px] font-[590] tracking-tight">Legal</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="/privacy" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[#f7f8f8] text-[13px] font-[590] tracking-tight">Resources</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="/blog" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[#f7f8f8] text-[13px] font-[590] tracking-tight">Connect</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    X (Twitter)
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-[#888] text-[13px] font-[450] hover:text-[#f7f8f8] transition-colors">
                    Dribbble
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-[#23252a] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#888] text-[12px] font-[450]">
              © {new Date().getFullYear()} KOVO Design Agency. All rights reserved.
            </p>
            <p className="text-[#888] text-[12px] font-[450]">
              Made with ❤️ in your city
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
