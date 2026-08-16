import React from "react";
import { FileText, Bookmark, Tag, Clock, CheckCircle2 } from "lucide-react";
import Reveal from "../motion/Reveal";
import StaggerContainer, { StaggerItem } from "../motion/StaggerContainer";

/**
 * KnowledgeShowcase
 * Core storytelling section 3: BUILD SHARED KNOWLEDGE / NOTES EDITOR
 * Large realistic StudySync Note Editor showcase with depth scale entrance and sequential internal stagger.
 */
const KnowledgeShowcase = ({ className = "" }) => {
  return (
    <section 
      className={`py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto ${className}`}
      aria-labelledby="knowledge-showcase-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Large Realistic StudySync Note Interface with Depth Scale Entrance */}
        <Reveal 
          direction="up" 
          distance={24} 
          scale={0.98} 
          duration={0.7}
          className="lg:col-span-7"
        >
          <div className="w-full rounded-[12px] bg-white border border-black/[0.08] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-left relative overflow-hidden">
            
            {/* Note Editor Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-[8px] bg-[#e6f3fe] text-[#0075de] flex items-center justify-center font-bold text-xs">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[13.5px] font-bold text-[#000000] block leading-tight">
                    Graph Traversal Algorithms (BFS & DFS)
                  </span>
                  <span className="text-[11.5px] text-[#757575]">
                    studySync / Computer Science — Data Structures
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11.5px] font-mono text-[#0075de] bg-[#e6f3fe] px-2.5 py-1 rounded-full border border-[#0075de]/20 font-medium">
                  <Bookmark className="w-16 h-16" /> Saved Note
                </span>
              </div>
            </div>

            {/* Internal Staggered Note Content */}
            <StaggerContainer staggerDelay={0.06} className="space-y-4">
              <StaggerItem distance={10}>
                <h3 className="text-[22px] font-bold text-[#000000] tracking-[-0.3px]">
                  Breadth-First Search vs Depth-First Search
                </h3>
              </StaggerItem>

              <StaggerItem distance={10}>
                <p className="text-[14px] text-[#615d59] leading-relaxed">
                  Graph traversal algorithms form the foundation of pathfinding and network optimization. Here is a quick reference summary compiled during our group review:
                </p>
              </StaggerItem>

              {/* Realistic Code / Math Highlight Box */}
              <StaggerItem distance={10}>
                <div className="bg-[#f6f5f4] rounded-[8px] p-4 border border-black/[0.06] font-mono text-[12.5px] text-[#111111] space-y-1.5 overflow-x-auto">
                  <div className="text-[#0075de] font-semibold">// BFS Implementation snippet</div>
                  <div>function bfs(graph, startNode) &#123;</div>
                  <div className="pl-4">const queue = [startNode];</div>
                  <div className="pl-4">const visited = new Set([startNode]);</div>
                  <div className="pl-4">while (queue.length &gt; 0) &#123; /* traverse layer by layer */ &#125;</div>
                  <div>&#125;</div>
                </div>
              </StaggerItem>

              <StaggerItem distance={10}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-[8px] bg-[#f6f5f4] border border-black/[0.04]">
                    <span className="text-[11px] font-mono font-bold text-[#0075de] uppercase block mb-1">BFS Use Case</span>
                    <span className="text-[12px] text-[#615d59]">Shortest path in unweighted graphs, social network connections.</span>
                  </div>
                  <div className="p-3 rounded-[8px] bg-[#f6f5f4] border border-black/[0.04]">
                    <span className="text-[11px] font-mono font-bold text-[#e89d01] uppercase block mb-1">DFS Use Case</span>
                    <span className="text-[12px] text-[#615d59]">Topological sorting, cycle detection, maze routing algorithms.</span>
                  </div>
                </div>
              </StaggerItem>

              {/* Note Metadata & Tags Footer */}
              <StaggerItem distance={10}>
                <div className="pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3 text-[12px] text-[#757575]">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-[#f6f5f4] px-2 py-0.5 rounded text-[11px] font-mono text-[#615d59]">
                      <Tag className="w-16 h-16 text-[#0075de]" /> #algorithms
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#f6f5f4] px-2 py-0.5 rounded text-[11px] font-mono text-[#615d59]">
                      #data-structures
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11.5px] text-[#757575]">
                    <Clock className="w-16 h-16" />
                    <span>Saved from AI & ML Group • Updated today</span>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>

          </div>
        </Reveal>

        {/* RIGHT COLUMN: Editorial Explanation */}
        <Reveal direction="up" distance={18} delay={0.15} className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[11px] font-mono font-semibold tracking-[0.16em] uppercase text-[#0075de] bg-[#e6f3fe] px-3 py-1 rounded-full border border-[#0075de]/20 inline-block mb-4">
              Shared Knowledge
            </span>
            <h2 
              id="knowledge-showcase-heading"
              className="text-[32px] sm:text-[40px] lg:text-[44px] font-bold text-[#000000] tracking-[-1.5px] leading-[1.12]"
            >
              Turn conversations into knowledge.
            </h2>
            <p className="mt-4 text-[16px] sm:text-[17px] text-[#615d59] leading-relaxed">
              Useful ideas shouldn't disappear when the conversation ends. StudySync gives your group a shared place to capture, organize, and revisit what you've learned together.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e6f3fe] text-[#0075de] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#000000]">Rich Document Editing</h4>
                <p className="text-[13px] text-[#615d59]">Format markdown notes, code snippets, lists, and math equations with zero friction.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e6f3fe] text-[#0075de] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#000000]">Persistent Group Knowledge</h4>
                <p className="text-[13px] text-[#615d59]">Key takeaways remain accessible to every group member, creating a lasting study archive.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e6f3fe] text-[#0075de] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#000000]">Category Filtering & Search</h4>
                <p className="text-[13px] text-[#615d59]">Filter notes by subject tag or search across group archives instantly when prepping for exams.</p>
              </div>
            </div>
          </div>

        </Reveal>

      </div>
    </section>
  );
};

export default KnowledgeShowcase;
