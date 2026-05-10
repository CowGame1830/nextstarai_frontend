'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  Star,
  Award,
  Activity,
  BarChart3,
  Zap,
  Shield,
  Heart,
  TextCursor,
  User,
  Map,
  Cpu
} from 'lucide-react';

// Radar Chart Component
const RadarChart = ({ attributes, title }: { attributes: Array<{ name: string, value: number }>, title: string }) => {
  const svgWidth = 520;
  const svgHeight = 460;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2 + 10;
  const maxRadius = 110;
  const numSides = attributes.length;

  // Generate pentagon/hexagon points
  const points = attributes.map((_, index) => {
    const angle = (index * 2 * Math.PI) / numSides - Math.PI / 2;
    return {
      x: centerX + Math.cos(angle) * maxRadius,
      y: centerY + Math.sin(angle) * maxRadius,
      labelX: centerX + Math.cos(angle) * (maxRadius + 50),
      labelY: centerY + Math.sin(angle) * (maxRadius + 50),
    };
  });

  // Generate data points
  const dataPoints = attributes.map((attr, index) => {
    const angle = (index * 2 * Math.PI) / numSides - Math.PI / 2;
     const safeValue = isNaN(attr.value) ? 0 : (attr.value || 0); 
    const radius = (attr.value / 100) * maxRadius;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  });

  return (
    <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: 'var(--purple-light)', borderColor: 'var(--purple-accent)' }}>
      <h4 className="text-lg font-bold mb-4 text-center gradient-text">{title}</h4>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" height={svgHeight} className="mx-auto block max-w-[520px]">
        {/* Grid lines */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, index) => (
          <polygon
            key={index}
            points={points.map(point =>
              `${centerX + (point.x - centerX) * scale},${centerY + (point.y - centerY) * scale}`
            ).join(' ')}
            fill="none"
            stroke="var(--purple-accent)"
            strokeWidth="1"
            opacity={0.3}
          />
        ))}

        {/* Axis lines */}
        {points.map((point, index) => (
          <line
            key={index}
            x1={centerX}
            y1={centerY}
            x2={point.x}
            y2={point.y}
            stroke="var(--purple-accent)"
            strokeWidth="1"
            opacity={0.3}
          />
        ))}

        {/* Data area */}
        <polygon
          points={dataPoints.map(point => `${point.x},${point.y}`).join(' ')}
          fill="var(--purple-primary)"
          fillOpacity="0.3"
          stroke="var(--purple-primary)"
          strokeWidth="2"
        />

        {/* Data points */}
        {dataPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="var(--purple-primary)"
          />
        ))}

        {/* Labels */}
        {attributes.map((attr, index) => {
          // Adjust text anchor based on position to prevent cutoff
          const angle = (index * 2 * Math.PI) / numSides - Math.PI / 2;
          const isLeft = Math.cos(angle) < -0.3;
          const isRight = Math.cos(angle) > 0.3;
          const textAnchor = isLeft ? 'end' : isRight ? 'start' : 'middle';

          return (
            <g key={index}>
              <text
                x={points[index].labelX}
                y={points[index].labelY - 8}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                fill="var(--foreground)"
                fontSize="13"
                fontWeight="bold"
              >
                {attr.name}
              </text>
              <text
                x={points[index].labelX}
                y={points[index].labelY + 8}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                fill="var(--purple-primary)"
                fontSize="12"
                fontWeight="bold"
              >
                {attr.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};



export default function PlayerDetail() {
  const params = useParams();
  const playerId = params?.id as string;
  const [player, setPlayer] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

useEffect(() => {
  const fetchPlayer = async () => {
    try {
      const res = await fetch(
        `/api//merge-data`
      );

      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("API did not return an array:", data);
        return;
      }

      const foundPlayer = data.find(
        (p: any) => p.id.toString() === playerId
      );

      console.log(JSON.stringify(foundPlayer, null, 2));

      if (!foundPlayer) return;

      setPlayer(foundPlayer);

    } catch (err) {
      console.error(err);
    }
  };

  fetchPlayer();
}, [playerId]);


  useEffect(() => {
    if (activeTab === 'ai-analysis' && analysis.length === 0) {
      generateAIAnalysis();
    }
  }, [activeTab]);

  
  const generateAIAnalysis = async () => {
    if (!player) return;

    setLoadingAnalysis(true);

    const prompt = `
      Analyze this football player like a professional scout.

      Pace: ${player.attributes?.pace}
      Stamina: ${player.attributes?.stamina}
      Acceleration: ${player.attributes?.acceleration}

      Rules:
      - Give EXACTLY 4 bullet points
      - Each point must be concise
      - No intro, no conclusion
      `;

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      setLoadingAnalysis(false);
      return;
    }

    if (!data.text) {
      console.error("Gemini API returned no text:", data);
      setLoadingAnalysis(false);
      return;
    }

    const lines = data.text
      .split("\n")
      .map((line: string) => line.replace(/^[-•\d.]\s*/, ""))
      .filter((line: string) => line.trim() !== "")
      .slice(0, 4);

    setAnalysis(lines);
    setLoadingAnalysis(false);
  };


  if (!player) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16 animate-fade-in">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-light)' }}>
              <span className="text-6xl">😕</span>
            </div>
            <h1 className="text-3xl font-bold mb-4 gradient-text">Player Not Found</h1>
            <p className="text-lg mb-8" style={{ color: 'var(--muted)' }}>
              The player you're looking for doesn't exist in our database.
            </p>
            <Link
              href="/players"
              className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
              style={{ background: 'var(--purple-primary)' }}
            >
              <span>← Back to Players</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'attributes', label: 'Attributes', icon: Target },
    { id: 'ai-analysis', label: 'AI Analysis', icon: Zap },
    { id: 'main-attributes', label: 'Main Attributes', icon: Target },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/players"
          className="inline-flex items-center space-x-2 mb-8 px-4 py-2 rounded-lg border-2 transition-all duration-200 hover:shadow-lg"
          style={{
            color: 'var(--foreground)',
            borderColor: 'var(--purple-accent)',
            backgroundColor: 'var(--panel)'
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Players</span>
        </Link>

        {/* Player Header */}
        <div className="rounded-3xl shadow-xl border-2 overflow-hidden mb-8 animate-fade-in" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
          <div className="h-40 relative overflow-hidden" style={{ background: 'var(--purple-primary)' }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.1), transparent)' }}></div>
            <div className="absolute bottom-4 right-4 text-white/30 text-6xl font-bold">
              #{player.id}
            </div>
          </div>

          <div className="px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
              {/* Player Photo */}
              <div className="relative -mt-24 mb-6 lg:mb-0 shrink-0">
                <div className="absolute inset-0 bg-purple-gradient rounded-full opacity-20 animate-pulse"></div>
                <div className="relative w-[90px] h-[90px] rounded-full overflow-hidden">
                  <Image
                    src={player.photo}
                    alt={player.name}
                    fill
                    className="object-cover shadow-xl group-hover:scale-105 transition-transform duration-300"
                    style={{ borderColor: 'var(--purple-primary)' }}
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-opacity-30" style={{ borderColor: 'var(--purple-accent)' }}></div>
                </div>
                <div className="absolute -bottom-2 -right-2 text-white text-xl font-bold rounded-full w-14 h-14 flex items-center justify-center shadow-xl border-2" style={{ backgroundColor: 'var(--purple-primary)', borderColor: 'white' }}>
                  {player.stats.rating}
                </div>
              </div>

              {/* Player Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3 gradient-text">{player.name}</h1>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-2 rounded-full font-semibold text-lg capitalize text-white" style={{ backgroundColor: 'var(--purple-primary)' }}>
                    {player.position}
                  </span>
                  <div className="flex items-center" style={{ color: 'var(--muted)' }}>
                    <Users className="w-5 h-5 mr-2" />
                    <span className="font-medium">{player.team}</span>
                  </div>
                  <div className="flex items-center" style={{ color: 'var(--muted)' }}>
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="font-medium">{player.nationality}</span>
                  </div>
                  <div className="flex items-center" style={{ color: 'var(--muted)' }}>
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="font-medium">{player.age} years old</span>
                  </div>
                  {player.height && (
                    <div className="flex items-center" style={{ color: 'var(--muted)' }}>
                      <User className="w-5 h-5 mr-4" />
                      <span className="font-medium">{player.height}cm</span>
                    </div>
                  )}
                  {player.weight && (
                    <div className="flex items-center" style={{ color: 'var(--muted)' }}>
                      <span className="font-medium">{player.weight}kg</span>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-xl relative overflow-hidden border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="absolute inset-0 opacity-10" style={{ background: 'var(--purple-primary)' }}></div>
                    <div className="relative z-10">
                      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{player.stats.goals}</div>
                      <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Goals</div>
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl relative overflow-hidden border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="absolute inset-0 opacity-10" style={{ background: 'var(--purple-primary)' }}></div>
                    <div className="relative z-10">
                      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{player.stats.assists}</div>
                      <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Assists</div>
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl relative overflow-hidden border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="absolute inset-0 opacity-10" style={{ background: 'var(--purple-primary)' }}></div>
                    <div className="relative z-10">
                      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{player.stats.appearances}</div>
                      <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Apps</div>
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl relative overflow-hidden border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="absolute inset-0 opacity-10" style={{ background: 'var(--purple-primary)' }}></div>
                    <div className="relative z-10">
                      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{player.aiAnalysis.overallScore}</div>
                      <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>AI Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Value */}
              <div className="lg:text-right mt-6 lg:mt-0">
                <div className="p-6 rounded-2xl text-center lg:text-right border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                  <div className="text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Market Value</div>
                  <div className="text-4xl font-bold mb-2 gradient-text">
                    €{(player.aiAnalysis.marketValue / 1000000).toFixed(1)}M
                  </div>
                  <div className="flex items-center justify-center lg:justify-end text-green-400 text-sm font-medium">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+12% this month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="rounded-2xl shadow-lg border-2 mb-8 animate-slide-up" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
          <div className="border-b-2" style={{ borderColor: 'var(--purple-accent)' }}>
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-all duration-200 ${activeTab === tab.id
                      ? 'border-purple-primary text-purple-primary'
                      : 'border-transparent hover:border-purple-accent'
                      }`}
                    style={{
                      color: activeTab === tab.id ? 'var(--purple-primary)' : 'var(--muted)',
                      borderBottomColor: activeTab === tab.id ? 'var(--purple-primary)' : 'transparent'
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Season Performance */}
                <div>
                  <h3 className="text-xl font-bold mb-6 gradient-text">Season Performance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <span style={{ color: 'var(--muted)' }}>Minutes Played</span>
                      <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{player.stats.minutesPlayed.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <span style={{ color: 'var(--muted)' }}>Goals per Game</span>
                      <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{(player.stats.goals / player.stats.appearances).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <span style={{ color: 'var(--muted)' }}>Assists per Game</span>
                      <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{(player.stats.assists / player.stats.appearances).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <span style={{ color: 'var(--muted)' }}>Yellow Cards</span>
                      <span className="font-bold text-yellow-600">3</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <span style={{ color: 'var(--muted)' }}>Red Cards</span>
                      <span className="font-bold text-red-600">0</span>
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div>
                  <h3 className="text-xl font-bold mb-6 gradient-text">AI Future Projection</h3>
                  <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: 'var(--purple-light)', borderColor: 'var(--purple-accent)' }}>
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--purple-primary)' }}>
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2" style={{ color: 'var(--purple-primary)' }}>Projected Growth</h4>
                        <p style={{ color: 'var(--muted)' }}>
                          Based on current performance trends, this player is expected to improve their overall rating by 2-3 points over the next season, with particular growth in technical skills and match awareness.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Offensive Stats */}
                <div>
                  <h3 className="text-lg font-bold mb-6 gradient-text">Offensive</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Goals</span>
                        <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{player.stats.goals}</span>
                      </div>
                      <div className="w-full rounded-full h-3" style={{ backgroundColor: 'var(--purple-accent)' }}>
                        <div
                          className="bg-purple-gradient h-3 rounded-full"
                          style={{ width: `${Math.min(player.stats.goals * 4, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Assists</span>
                        <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{player.stats.assists}</span>
                      </div>
                      <div className="w-full rounded-full h-3" style={{ backgroundColor: 'var(--purple-accent)' }}>
                        <div
                          className="bg-purple-gradient h-3 rounded-full"
                          style={{ width: `${Math.min(player.stats.assists * 6, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div>
                  <h3 className="text-lg font-bold mb-6 gradient-text">Performance</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Rating</span>
                        <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{player.stats.rating}</span>
                      </div>
                      <div className="w-full rounded-full h-3" style={{ backgroundColor: 'var(--purple-accent)' }}>
                        <div
                          className="bg-purple-gradient h-3 rounded-full"
                          style={{ width: `${player.stats.rating}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Appearances</span>
                        <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{player.stats.appearances}</span>
                      </div>
                      <div className="w-full rounded-full h-3" style={{ backgroundColor: 'var(--purple-accent)' }}>
                        <div
                          className="bg-purple-gradient h-3 rounded-full"
                          style={{ width: `${Math.min(player.stats.appearances * 2.5, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Discipline Stats */}
                <div>
                  <h3 className="text-lg font-bold mb-6 gradient-text">Discipline</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Yellow Cards</span>
                        <span className="font-bold text-yellow-600">3</span>
                      </div>
                      <div className="text-center py-2">
                        <span className="text-4xl">🟨</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Red Cards</span>
                        <span className="font-bold text-red-600">0</span>
                      </div>
                      <div className="text-center py-2">
                        <span className="text-4xl">🟥</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attributes' && (
              <div className="space-y-8">
                {/* Overall Rating */}
                <div className="text-center p-8 rounded-2xl border-2" style={{ backgroundColor: 'var(--purple-light)', borderColor: 'var(--purple-accent)' }}>
                  <div className="text-6xl font-bold mb-4 gradient-text">{player.aiAnalysis.overallScore}</div>
                  <div className="text-xl mb-4" style={{ color: 'var(--muted)' }}>Overall Rating</div>
                  <div className="max-w-md mx-auto">
                    <div className="w-full rounded-full h-3" style={{ backgroundColor: 'var(--purple-accent)' }}>
                      <div
                        className="bg-purple-gradient h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${player.aiAnalysis.overallScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Physical, Shooting, Technical, and Passing Attributes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold gradient-text flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Physical
                    </h3>
                    {player.attributes && (
                      <div className="space-y-3">
                        {[
                          { label: 'Pace', value: player.attributes.pace },
                          { label: 'Acceleration', value: player.attributes.acceleration },
                          { label: 'Sprint Speed', value: player.attributes.sprintSpeed },
                          { label: 'Stamina', value: player.attributes.stamina },
                          { label: 'Strength', value: player.attributes.strength },
                          { label: 'Agility', value: player.attributes.agility },
                          { label: 'Balance', value: player.attributes.balance },
                          { label: 'Jumping', value: player.attributes.jumping },
                        ].map((attr, index) => (
                          <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
                            <div className="flex justify-between items-center mb-2">
                              <span style={{ color: 'var(--muted)' }}>{attr.label}</span>
                              <span className={`font-bold px-2 py-1 rounded text-white text-sm ${attr.value >= 85 ? 'bg-green-500' :
                                attr.value >= 75 ? 'bg-blue-500' :
                                  attr.value >= 65 ? 'bg-yellow-500' :
                                    attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                }`}>
                                {attr.value}
                              </span>
                            </div>
                            <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--purple-accent)' }}>
                              <div
                                className={`h-2 rounded-full transition-all duration-1000 ${attr.value >= 85 ? 'bg-green-500' :
                                  attr.value >= 75 ? 'bg-blue-500' :
                                    attr.value >= 65 ? 'bg-yellow-500' :
                                      attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                  }`}
                                style={{ width: `${attr.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold gradient-text flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Shooting
                    </h3>
                    {player.attributes && (
                      <div className="space-y-3">
                        {[
                          { label: 'Shooting', value: player.attributes.shooting },
                          { label: 'Finishing', value: player.attributes.finishing },
                          { label: 'Long Shots', value: player.attributes.longShots },
                          { label: 'Volleys', value: player.attributes.volleys },
                          { label: 'Penalties', value: player.attributes.penalties },
                        ].map((attr, index) => (
                          <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
                            <div className="flex justify-between items-center mb-2">
                              <span style={{ color: 'var(--muted)' }}>{attr.label}</span>
                              <span className={`font-bold px-2 py-1 rounded text-white text-sm ${attr.value >= 85 ? 'bg-green-500' :
                                attr.value >= 75 ? 'bg-blue-500' :
                                  attr.value >= 65 ? 'bg-yellow-500' :
                                    attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                }`}>
                                {attr.value}
                              </span>
                            </div>
                            <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--purple-accent)' }}>
                              <div
                                className={`h-2 rounded-full transition-all duration-1000 ${attr.value >= 85 ? 'bg-green-500' :
                                  attr.value >= 75 ? 'bg-blue-500' :
                                    attr.value >= 65 ? 'bg-yellow-500' :
                                      attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                  }`}
                                style={{ width: `${attr.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold gradient-text flex items-center">
                      <TextCursor className="w-5 h-5 mr-2" />
                      Technical
                    </h3>
                    {player.attributes && (
                      <div className="space-y-3">
                        {[
                          { label: 'Dribbling', value: player.attributes.dribbling },
                          { label: 'Ball Control', value: player.attributes.ballControl },
                          { label: 'First Touch', value: player.attributes.firstTouch },
                          { label: 'Technique', value: player.attributes.technique },
                        ].map((attr, index) => (
                          <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
                            <div className="flex justify-between items-center mb-2">
                              <span style={{ color: 'var(--muted)' }}>{attr.label}</span>
                              <span className={`font-bold px-2 py-1 rounded text-white text-sm ${attr.value >= 85 ? 'bg-green-500' :
                                attr.value >= 75 ? 'bg-blue-500' :
                                  attr.value >= 65 ? 'bg-yellow-500' :
                                    attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                }`}>
                                {attr.value}
                              </span>
                            </div>
                            <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--purple-accent)' }}>
                              <div
                                className={`h-2 rounded-full transition-all duration-1000 ${attr.value >= 85 ? 'bg-green-500' :
                                  attr.value >= 75 ? 'bg-blue-500' :
                                    attr.value >= 65 ? 'bg-yellow-500' :
                                      attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                  }`}
                                style={{ width: `${attr.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Defensive and Mental Attributes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold gradient-text flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Passing
                    </h3>
                    {player.attributes && (
                      <div className="space-y-3">
                        {[
                          { label: 'Passing', value: player.attributes.passing },
                          { label: 'Short Passing', value: player.attributes.shortPassing },
                          { label: 'Long Passing', value: player.attributes.longPassing },
                          { label: 'Crossing', value: player.attributes.crossing },
                          { label: 'Free Kicks', value: player.attributes.freeKicks },
                          { label: 'Curve', value: player.attributes.curve },
                        ].map((attr, index) => (
                          <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
                            <div className="flex justify-between items-center mb-2">
                              <span style={{ color: 'var(--muted)' }}>{attr.label}</span>
                              <span className={`font-bold px-2 py-1 rounded text-white text-sm ${attr.value >= 85 ? 'bg-green-500' :
                                attr.value >= 75 ? 'bg-blue-500' :
                                  attr.value >= 65 ? 'bg-yellow-500' :
                                    attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                }`}>
                                {attr.value}
                              </span>
                            </div>
                            <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--purple-accent)' }}>
                              <div
                                className={`h-2 rounded-full transition-all duration-1000 ${attr.value >= 85 ? 'bg-green-500' :
                                  attr.value >= 75 ? 'bg-blue-500' :
                                    attr.value >= 65 ? 'bg-yellow-500' :
                                      attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                  }`}
                                style={{ width: `${attr.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold gradient-text flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Defensive
                    </h3>
                    {player.attributes && (
                      <div className="space-y-3">
                        {[
                          { label: 'Defending', value: player.attributes.defending },
                          { label: 'Interceptions', value: player.attributes.interceptions },
                          { label: 'Standing Tackle', value: player.attributes.tacklingStanding },
                          { label: 'Sliding Tackle', value: player.attributes.tacklingSliding },
                          { label: 'Heading', value: player.attributes.heading },
                        ].map((attr, index) => (
                          <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
                            <div className="flex justify-between items-center mb-2">
                              <span style={{ color: 'var(--muted)' }}>{attr.label}</span>
                              <span className={`font-bold px-2 py-1 rounded text-white text-sm ${attr.value >= 85 ? 'bg-green-500' :
                                attr.value >= 75 ? 'bg-blue-500' :
                                  attr.value >= 65 ? 'bg-yellow-500' :
                                    attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                }`}>
                                {attr.value}
                              </span>
                            </div>
                            <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--purple-accent)' }}>
                              <div
                                className={`h-2 rounded-full transition-all duration-1000 ${attr.value >= 85 ? 'bg-green-500' :
                                  attr.value >= 75 ? 'bg-blue-500' :
                                    attr.value >= 65 ? 'bg-yellow-500' :
                                      attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                  }`}
                                style={{ width: `${attr.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold gradient-text flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Mental
                    </h3>
                    {player.attributes && (
                      <div className="space-y-3">
                        {[
                          { label: 'Positioning', value: player.attributes.positioning },
                          { label: 'Vision', value: player.attributes.vision },
                          { label: 'Composure', value: player.attributes.composure },
                          { label: 'Reactions', value: player.attributes.reactions },
                          { label: 'Work Rate', value: player.attributes.workRate },
                        ].map((attr, index) => (
                          <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
                            <div className="flex justify-between items-center mb-2">
                              <span style={{ color: 'var(--muted)' }}>{attr.label}</span>
                              <span className={`font-bold px-2 py-1 rounded text-white text-sm ${attr.value >= 85 ? 'bg-green-500' :
                                attr.value >= 75 ? 'bg-blue-500' :
                                  attr.value >= 65 ? 'bg-yellow-500' :
                                    attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                }`}>
                                {attr.value}
                              </span>
                            </div>
                            <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--purple-accent)' }}>
                              <div
                                className={`h-2 rounded-full transition-all duration-1000 ${attr.value >= 85 ? 'bg-green-500' :
                                  attr.value >= 75 ? 'bg-blue-500' :
                                    attr.value >= 65 ? 'bg-yellow-500' :
                                      attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                  }`}
                                style={{ width: `${attr.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Goalkeeping Attributes (only for GK) */}
                  {player.position === 'Goalkeeper' && player.attributes.gkDiving && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold gradient-text flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Goalkeeping
                      </h3>
                      <div className="space-y-3">
                        {[
                          { label: 'GK Diving', value: player.attributes.gkDiving },
                          { label: 'GK Handling', value: player.attributes.gkHandling || 0 },
                          { label: 'GK Kicking', value: player.attributes.gkKicking || 0 },
                          { label: 'GK Positioning', value: player.attributes.gkPositioning || 0 },
                          { label: 'GK Reflexes', value: player.attributes.gkReflexes || 0 },
                        ].map((attr, index) => (
                          <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
                            <div className="flex justify-between items-center mb-2">
                              <span style={{ color: 'var(--muted)' }}>{attr.label}</span>
                              <span className={`font-bold px-2 py-1 rounded text-white text-sm ${attr.value >= 85 ? 'bg-green-500' :
                                attr.value >= 75 ? 'bg-blue-500' :
                                  attr.value >= 65 ? 'bg-yellow-500' :
                                    attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                }`}>
                                {attr.value}
                              </span>
                            </div>
                            <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--purple-accent)' }}>
                              <div
                                className={`h-2 rounded-full transition-all duration-1000 ${attr.value >= 85 ? 'bg-green-500' :
                                  attr.value >= 75 ? 'bg-blue-500' :
                                    attr.value >= 65 ? 'bg-yellow-500' :
                                      attr.value >= 55 ? 'bg-orange-500' : 'bg-red-500'
                                  }`}
                                style={{ width: `${attr.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Attribute Comparison Radar Chart Placeholder */}
                <div className="p-8 rounded-2xl text-center" style={{ backgroundColor: 'var(--purple-light)', borderColor: 'var(--purple-accent)' }}>
                  <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-4 gradient-text">Advanced Analytics</h2>
                      <p style={{ color: 'var(--muted)' }}>
                        Visual analysis of player performance, position effectiveness, and attribute comparisons
                      </p>
                    </div>

                    {/* Radar Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {player.attributes && (
                        <>
                          <RadarChart
                            title="Physical & Mental Attributes"
                            attributes={[
                              { name: 'Pace', value: player.attributes.pace },
                              { name: 'Stamina', value: player.attributes.stamina },
                              { name: 'Strength', value: player.attributes.strength },
                              { name: 'Vision', value: player.attributes.vision },
                              { name: 'Composure', value: player.attributes.composure },
                              { name: 'Work Rate', value: player.attributes.workRate },
                            ]}
                          />

                          {player.position !== 'Goalkeeper' ? (
                            <RadarChart
                              title="Technical & Tactical Attributes"
                              attributes={[
                                { name: 'Dribbling', value: player.attributes.dribbling },
                                { name: 'Ball Control', value: player.attributes.ballControl },
                                { name: 'Passing', value: player.attributes.passing },
                                { name: 'Defending', value: player.attributes.defending },
                                { name: 'Positioning', value: player.attributes.positioning },
                                { name: 'Technique', value: player.attributes.technique },
                              ]}
                            />
                          ) : (
                            <RadarChart
                              title="Goalkeeping Attributes"
                              attributes={[
                                { name: 'Diving', value: player.attributes.gkDiving || 0 },
                                { name: 'Handling', value: player.attributes.gkHandling || 0 },
                                { name: 'Kicking', value: player.attributes.gkKicking || 0 },
                                { name: 'Positioning', value: player.attributes.gkPositioning || 0 },
                                { name: 'Reflexes', value: player.attributes.gkReflexes || 0 },
                                { name: 'Composure', value: player.attributes.composure },
                              ]}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-analysis' && (
              <div className="space-y-8">
                {/* Overall AI Score */}
                <div className="text-center p-12 rounded-3xl border-2 relative overflow-hidden" style={{ backgroundColor: 'var(--purple-light)', borderColor: 'var(--purple-accent)' }}>
                  <div className="absolute inset-0 bg-purple-gradient opacity-5"></div>
                  <div className="relative z-10">
                    <div className="text-8xl font-bold mb-4 gradient-text">{player.aiAnalysis.overallScore}</div>
                    <div className="text-2xl mb-6" style={{ color: 'var(--muted)' }}>AI Overall Score</div>
                    <div className="max-w-2xl mx-auto">
                      <div className="w-full rounded-full h-4" style={{ backgroundColor: 'var(--purple-accent)' }}>
                        <div
                          className="bg-purple-gradient h-4 rounded-full transition-all duration-1000"
                          style={{ width: `${player.aiAnalysis.overallScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strengths and Weaknesses */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Strengths */}
                  <div className="p-6 rounded-2xl border-2 border-green-200" style={{ backgroundColor: 'var(--purple-light)' }}>
                    <div className="flex items-center space-x-3 mb-6">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-green-700">Key Strengths</h3>
                    </div>
                    <div className="space-y-3">
                      {player.aiAnalysis?.strengths?.map((strength: string, index: number) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-green-800 font-medium">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weaknesses - using placeholder data */}
                  <div className="p-6 rounded-2xl border-2 border-red-200" style={{ backgroundColor: 'var(--purple-light)' }}>
                    <div className="flex items-center space-x-3 mb-6">
                      <TrendingDown className="w-6 h-6 text-red-600" />
                      <h3 className="text-xl font-bold text-red-700">Areas for Improvement</h3>
                    </div>
                    <div className="space-y-3">
                      {['Aerial duels', 'Long passing accuracy', 'Defensive positioning'].map((weakness, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-red-800 font-medium">{weakness}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* XGBoost Model Analysis */}
                {player.aiAnalysis.xgboostPosition && (
                  <div className="p-8 rounded-3xl border-2 animate-slide-up" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                      <div className="flex items-center space-x-4">
                        <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                          <Cpu className="w-8 h-8 text-purple-primary" style={{ color: 'var(--purple-primary)' }} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold gradient-text">Model Prediction</h3>
                          <p style={{ color: 'var(--muted)' }}>Advanced Position Analysis</p>
                        </div>
                      </div>
                      <div className="px-8 py-4 rounded-2xl text-center border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                        <div className="text-sm font-medium mb-1" style={{ color: 'var(--muted)' }}>Recommended Position</div>
                        <div className="text-3xl font-bold" style={{ color: 'var(--purple-primary)' }}>
                          {player.aiAnalysis.xgboostPosition}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <h4 className="text-lg font-bold mb-4" style={{ color: 'var(--foreground)' }}>Confidence Breakdown</h4>
                        <div className="space-y-4">
                          {player.aiAnalysis.probabilities?.split(', ').map((prob: string, index: number) => {
                            const [label, valueStr] = prob.split(' (');
                            const value = parseFloat(valueStr.replace('%)', ''));
                            return (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center text-sm font-bold">
                                  <span style={{ color: 'var(--foreground)' }}>{label}</span>
                                  <span style={{ color: 'var(--purple-primary)' }}>{value}%</span>
                                </div>
                                <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--purple-light)' }}>
                                  <div 
                                    className="h-full bg-purple-gradient transition-all duration-1000" 
                                    style={{ width: `${value}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                        <div className="flex items-start space-x-4">
                          <div className="p-2 rounded-lg bg-white/50">
                            <Star className="w-5 h-5 text-yellow-500" />
                          </div>
                          <div>
                            <h4 className="font-bold mb-2" style={{ color: 'var(--purple-primary)' }}>Model Insight</h4>
                            <p className="text-sm" style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
                              The model analyzed 38 features including physical metrics and seasonal performance. 
                              The high confidence score for <strong>{player.aiAnalysis.xgboostPosition}</strong> indicates 
                              that the player's attributes strongly align with elite-level standards for this role.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Analysis */}
                <div
                  className="p-8 rounded-2xl border-2"
                  style={{
                    backgroundColor: 'var(--purple-light)',
                    borderColor: 'var(--purple-accent)',
                  }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <Award className="w-6 h-6" style={{ color: 'var(--purple-primary)' }} />
                    <h3
                      className="text-xl font-bold"
                      style={{ color: 'var(--purple-primary)' }}
                    >
                      AI Analysis
                    </h3>
                  </div>

                  <div className="grid gap-4">
                    {loadingAnalysis ? (
                      <p>Analyzing player...</p>
                    ) : analysis.length === 0 ? (
                      <p>No AI analysis yet</p>
                    ) : (
                      analysis.map((recommendation, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white/50 rounded-xl border border-white/20"
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                              style={{ backgroundColor: 'var(--purple-primary)' }}
                            >
                              {index + 1}
                            </div>
                            <span style={{ color: 'var(--foreground)' }}>
                              {recommendation}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'main-attributes' && (
              <div className="space-y-8">
                {/* Overall Rating */}
                <div className="text-center p-8 rounded-2xl border-2" style={{ backgroundColor: 'var(--purple-light)', borderColor: 'var(--purple-accent)' }}>
                  <div className="text-6xl font-bold mb-4 gradient-text">{player.aiAnalysis.overallScore}</div>
                  <div className="text-xl mb-4" style={{ color: 'var(--muted)' }}>Overall Rating</div>
                  <div className="max-w-md mx-auto">
                    <div className="w-full rounded-full h-3" style={{ backgroundColor: 'var(--purple-accent)' }}>
                      <div
                        className="bg-purple-gradient h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${player.aiAnalysis.overallScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Main Attributes - Premium Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {player.attributes && [
                    { label: 'Pace', value: player.attributes.pace, icon: Zap },
                    { label: 'Acceleration', value: player.attributes.acceleration, icon: Activity },
                    { label: 'Stamina', value: player.attributes.stamina, icon: Heart },
                    { label: 'Work Rate', value: player.attributes.workRate, icon: Target },
                  ].map((attr, index) => (
                    <div 
                      key={index} 
                      className="group p-6 rounded-3xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                      style={{ 
                        backgroundColor: 'var(--purple-light)', 
                        borderColor: 'var(--purple-accent)' 
                      }}
                    >
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-4 rounded-2xl bg-white shadow-inner group-hover:bg-purple-gradient transition-all duration-500 transform group-hover:rotate-12">
                          <attr.icon className="w-8 h-8 text-purple-primary group-hover:text-white" />
                        </div>
                        <div>
                          <div className="text-4xl font-black gradient-text mb-1">{attr.value}</div>
                          <div className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{attr.label}</div>
                        </div>
                        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--purple-accent)' }}>
                          <div 
                            className="h-full bg-purple-gradient transition-all duration-1000 ease-out" 
                            style={{ width: `${attr.value}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Attribute Comparison Radar Chart Placeholder */}
                <div className="p-8 rounded-2xl text-center" style={{ backgroundColor: 'var(--purple-light)', borderColor: 'var(--purple-accent)' }}>
                  <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-4 gradient-text">Advanced Analytics</h2>
                      <p style={{ color: 'var(--muted)' }}>
                        Visual analysis of player performance, position effectiveness, and attribute comparisons
                      </p>
                    </div>

                    {/* Radar Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                      {player.attributes && (

                        <RadarChart
                          title="Physical & Mental Attributes"
                          attributes={[
                            { name: 'Pace', value: player.attributes.pace },
                            { name: 'Stamina', value: player.attributes.stamina },
                            { name: 'Acceleration', value: player.attributes.acceleration },
                            { name: 'Work Rate', value: player.attributes.workRate },
                          ]}
                        />

                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}