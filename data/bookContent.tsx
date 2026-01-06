import React from 'react';
import { BookData } from '../types';
import { Lightbulb, Database, Wrench, Brain, Layers, ArrowRight, Code, Server, GitBranch, Terminal } from 'lucide-react';

// Helper component for code blocks
const CodeBlock = ({ language, code }: { language: string; code: string }) => (
  <div className="my-6 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
    <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-mono text-slate-500 uppercase flex justify-between">
      <span>{language}</span>
      <span className="text-slate-400">Example</span>
    </div>
    <div className="p-4 overflow-x-auto">
      <pre className="text-sm font-mono text-slate-800 whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

// Helper for diagrams/infographics placeholders
const DiagramPlaceholder = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center text-center shadow-sm">
    <h4 className="text-slate-900 font-bold mb-4 uppercase tracking-wider text-xs border-b border-slate-200 pb-2 w-full">{title}</h4>
    {children}
  </div>
);

export const bookContent: BookData = {
  title: "Generative AI Agents: 认知架构与实践白皮书",
  authors: ["Julia Wiesinger", "Patrick Marlow", "Vladimir Vuskovic"],
  date: "2024年9月",
  chapters: [
    {
      id: "intro",
      title: "1. 范式转变：从模型到智能体",
      sections: [
        {
          id: "introduction",
          title: "引言：超越生成",
          content: (
            <>
              <p className="lead text-xl text-slate-700 mb-6 leading-relaxed font-serif">
                将理性推理（Reasoning）、逻辑规划能力与连接外部信息源的机制相结合，标志着生成式 AI 从单纯的内容生成器向<strong>“智能体 (Agent)”</strong>的范式转变。这不仅是模型能力的延伸，更是人机交互与自动化作业模式的根本性重构。
              </p>
              <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4">人类认知的映射</h3>
              <p className="mb-4">
                人类大脑天生擅长处理非结构化数据和复杂的模式识别任务。然而，我们的生物神经网络并非全知全能。在进行关键决策或得出结论之前，我们通常需要依赖外部工具——如查阅书籍获取知识、使用谷歌搜索验证事实、或利用计算器进行精确的数学运算——来补充我们大脑中已有的知识储备并扩展我们的能力边界。
              </p>
              <p className="mb-4">
                同理，生成式 AI 模型（LLMs）也可以被训练去使用工具。这使它们能够突破训练数据的静态限制，访问实时信息或建议现实世界的行动。例如，模型可以利用<strong>数据库检索工具 (Database Retrieval Tool)</strong> 访问特定领域的私有信息（如企业的客户购买历史 CRM 数据），从而生成高度个性化且准确的购物建议，而非仅仅依赖训练时的通用知识。
              </p>
              <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4">从被动响应到主动执行</h3>
              <p>
                更进一步，基于用户的模糊意图（Intent），模型可以进行一系列复杂的 API 调用编排。例如，它可以自动向同事发送起草好的电子邮件回复，或代表用户在银行系统中完成多步金融交易验证。要实现这一愿景，模型不仅必须拥有访问外部工具集的权限，更核心的是，它需要具备<strong>认知架构 (Cognitive Architecture)</strong>——即以自主方式规划任务、分解步骤、反思结果并最终执行的能力。
              </p>
            </>
          )
        },
        {
          id: "what-is-agent",
          title: "定义：什么是智能体 (Agent)？",
          content: (
            <>
              <p className="mb-6">
                在其最基本的形式中，生成式 AI 智能体可以定义为一个<strong>应用程序</strong>：它通过传感器或输入接口观察世界（Perception），利用其掌握的工具集（Tools）对世界产生影响（Action），从而致力于实现某个特定的目标（Goal）。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <GitBranch size={18} /> 自主性 (Autonomy)
                  </h4>
                  <p className="text-sm text-indigo-800 leading-relaxed">
                    智能体可以独立于人工干预进行操作。特别是在被赋予了明确的高层目标（High-level Goal）时，它不需要人类指挥每一步微小的操作（Micro-management），而是能够自我决策路径。
                  </p>
                </div>
                <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <Terminal size={18} /> 主动性 (Proactivity)
                  </h4>
                  <p className="text-sm text-indigo-800 leading-relaxed">
                    智能体在实现目标的方法上是主动的。即使没有人类提供的详尽标准作业程序（SOP），智能体也能通过<strong>推理 (Reasoning)</strong> 推导出为了实现最终目标，当前时刻应该采取的最佳行动是什么。
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4">核心认知架构解析</h3>
              <p className="mb-4">
                 为了深入理解智能体的内部工作原理，我们需要解构驱动智能体行为、行动和决策的基础组件。这些组件的有机组合构成了所谓的<strong>“认知架构”</strong>。下图展示了一个通用的智能体运行时环境：
              </p>

              <DiagramPlaceholder title="图 1：通用智能体架构与组件流转">
                <div className="flex flex-col gap-4 w-full max-w-3xl text-sm">
                  <div className="flex flex-col md:flex-row items-stretch gap-0 justify-center h-full">
                    
                    {/* Input */}
                    <div className="flex flex-col justify-center items-center bg-white p-4 rounded-l-lg border border-slate-200 border-r-0 w-32 relative z-10">
                      <span className="font-bold text-slate-700">用户查询</span>
                      <span className="text-xs text-slate-400 mt-1">Input</span>
                      <ArrowRight className="text-slate-300 mt-2 rotate-90 md:rotate-0" />
                    </div>

                    {/* Core Runtime */}
                    <div className="bg-slate-50 p-6 border border-indigo-200 flex-1 w-full relative rounded-lg md:rounded-none border-y md:border-y md:border-x-0">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 text-xs font-bold rounded shadow-sm tracking-wide uppercase">Agent Runtime (运行时)</div>
                      
                      <div className="flex flex-col gap-4 mt-2">
                        <div className="bg-white border-2 border-indigo-100 p-3 rounded text-center shadow-sm">
                          <div className="flex items-center justify-center gap-2 text-indigo-900 font-bold">
                            <Brain size={16} /> 编排层 (Orchestration)
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1">循环控制：观察 -> 思考 -> 决策 -> 行动</div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-purple-50 border border-purple-200 p-3 rounded text-center">
                            <span className="block text-purple-900 font-bold text-xs mb-1">记忆 (Memory)</span>
                            <div className="text-[10px] text-purple-700 leading-tight">短期对话历史<br/>长期向量存储</div>
                          </div>
                          <div className="bg-red-50 border border-red-200 p-3 rounded text-center">
                            <span className="block text-red-900 font-bold text-xs mb-1">模型 (Model)</span>
                            <div className="text-[10px] text-red-700 leading-tight">世界知识<br/>逻辑推理引擎</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tools */}
                    <div className="flex flex-col justify-center items-center bg-yellow-50 p-4 rounded-r-lg border border-yellow-200 border-l-0 w-32 relative z-10">
                      <Wrench className="text-yellow-600 mb-2" size={20} />
                      <span className="font-bold text-yellow-900">工具集</span>
                      <div className="text-[10px] text-yellow-700 mt-1 text-center">API / RAG / Code</div>
                    </div>

                  </div>
                </div>
              </DiagramPlaceholder>
            </>
          )
        }
      ]
    },
    {
      id: "components",
      title: "2. 核心组件深度解析",
      sections: [
        {
          id: "the-model",
          title: "模型 (The Model)：推理引擎",
          content: (
            <>
              <p className="mb-4">
                在智能体的架构中，模型（通常是大型语言模型 LLM）不仅是文本生成器，更是作为核心决策者（Decision Maker）的<strong>推理引擎</strong>。它类似于计算机的 CPU，负责处理信息、进行逻辑判断和分发指令。
              </p>
              <p className="mb-4">
                智能体使用的模型可以是单一的模型，也可以是针对不同任务优化的“模型混合体（Mixture of Models）”。关键在于，这些模型必须具备遵循复杂指令的能力，并能执行基于逻辑的推理框架。常见的推理范式包括：
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-3 items-start p-3 bg-slate-50 rounded border border-slate-100">
                  <span className="font-bold text-indigo-600 shrink-0">ReAct (Reason + Act)</span>
                  <span className="text-sm text-slate-600">一种结合了内部推理（Reasoning）和外部行动（Action）生成的范式。模型在执行动作前会先生成“思考痕迹”。</span>
                </li>
                <li className="flex gap-3 items-start p-3 bg-slate-50 rounded border border-slate-100">
                  <span className="font-bold text-indigo-600 shrink-0">CoT (Chain-of-Thought)</span>
                  <span className="text-sm text-slate-600">思维链技术，通过让模型展示逐步的思考过程来处理复杂任务，而非直接跳跃到结论。</span>
                </li>
                <li className="flex gap-3 items-start p-3 bg-slate-50 rounded border border-slate-100">
                  <span className="font-bold text-indigo-600 shrink-0">ToT (Tree-of-Thoughts)</span>
                  <span className="text-sm text-slate-600">思维树，允许模型探索多种可能性的分支，并回溯评估哪条路径最有可能解决问题。</span>
                </li>
              </ul>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <span className="font-bold">生产环境最佳实践：</span> 选择模型时不仅要考虑参数量，还要考虑其是否针对<strong>工具调用 (Function Calling)</strong> 进行了微调。理想情况下，模型应针对您计划在认知架构中使用的特定数据特征进行过训练或微调（Fine-tuning）。
                </div>
              </div>
            </>
          )
        },
        {
          id: "the-tools",
          title: "工具 (The Tools)：感知与接地",
          content: (
            <>
              <p className="mb-4">
                基础模型（Foundation Models）虽然在通用文本和图像生成方面表现惊人，但存在两个固有的局限性：
              </p>
              <ol className="list-decimal pl-6 space-y-1 mb-4 text-slate-700">
                <li><strong>知识静态性</strong>：模型的知识截止于训练结束的时间点，无法知晓即时新闻或最新的数据。</li>
                <li><strong>环境隔离</strong>：模型被隔离在数字沙箱中，无法直接与外部物理或数字世界交互（如无法直接发送邮件或查询实时库存）。</li>
              </ol>
              <p className="mb-4">
                <strong>工具 (Tools)</strong> 填补了这一空白。它们是智能体的“手”和“眼”，使智能体能够：
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-700">
                <li><strong>接地 (Grounding)</strong>：利用<strong>检索增强生成 (RAG)</strong> 系统访问私有知识库，减少幻觉，确保回答基于事实。</li>
                <li><strong>交互 (Interaction)</strong>：通过 Web API (HTTP GET/POST/PATCH/DELETE) 与企业系统（ERP, CRM）进行双向交互。</li>
                <li><strong>计算 (Computation)</strong>：调用代码解释器（Code Interpreter）执行精确的数学运算或数据分析。</li>
              </ul>
            </>
          )
        },
        {
          id: "orchestration",
          title: "编排层 (Orchestration)：循环控制系统",
          content: (
            <>
              <p className="mb-4">
                如果模型是大脑，工具是四肢，那么<strong>编排层 (Orchestration Layer)</strong> 就是神经系统。它定义了智能体如何运作的“循环机制 (The Loop)”。
              </p>
              <p className="mb-4">
                编排层负责维护智能体的内部状态（State Management），并管理以下核心循环：
              </p>
              <div className="my-6 pl-4 border-l-4 border-slate-300 space-y-4">
                <div className="relative">
                  <span className="absolute -left-6 bg-slate-200 rounded-full w-4 h-4 mt-1 border-2 border-white"></span>
                  <strong className="text-slate-900">1. 感知 (Observation)</strong>
                  <p className="text-sm text-slate-600">接收用户输入，或上一轮工具执行返回的原始数据（JSON/Text）。</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-6 bg-yellow-200 rounded-full w-4 h-4 mt-1 border-2 border-white"></span>
                  <strong className="text-slate-900">2. 推理 (Reasoning)</strong>
                  <p className="text-sm text-slate-600">利用 LLM 分析当前状态，结合短期记忆（Context）和长期记忆，规划下一步行动。</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-6 bg-blue-200 rounded-full w-4 h-4 mt-1 border-2 border-white"></span>
                  <strong className="text-slate-900">3. 决策 (Decision)</strong>
                  <p className="text-sm text-slate-600">决定是继续调用某个工具、向用户提问以消除歧义，还是已经拥有足够信息来输出最终答案。</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-6 bg-green-200 rounded-full w-4 h-4 mt-1 border-2 border-white"></span>
                  <strong className="text-slate-900">4. 执行 (Execution)</strong>
                  <p className="text-sm text-slate-600">实际调用 API 接口或生成自然语言回复。</p>
                </div>
              </div>
              <p>
                这个循环（Observation → Thought → Action → Observation...）会持续进行，直到满足终止条件（如解决了用户问题或达到了最大迭代次数）。编排层的实现可以简单如硬编码的 If-Else 规则，也可以复杂如基于概率图模型的自适应规划系统（如 LangChain Agents）。
              </p>
            </>
          )
        }
      ]
    },
    {
      id: "agents-vs-models",
      title: "3. 辨析：智能体 vs 模型",
      sections: [
        {
          id: "comparison",
          title: "能力对比矩阵",
          content: (
            <>
              <p className="mb-6 text-slate-600">
                理解“生成式模型”与“生成式智能体”之间的区别至关重要。模型是智能体的核心组件，但智能体是围绕模型构建的完整系统。模型提供智力，智能体提供行动力。
              </p>
              <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
                <table className="min-w-full text-left text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-slate-100 p-4 font-semibold text-slate-700 border-b border-slate-200 w-1/2">模型 (Models)</th>
                      <th className="bg-indigo-50 p-4 font-semibold text-indigo-700 border-b border-indigo-200 w-1/2">智能体 (Agents)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 align-top">
                        <strong className="block text-slate-900 mb-1">知识范围</strong>
                        <span className="text-slate-600">知识仅限于训练数据中包含的信息，且是静态的（截止于训练时间）。容易产生幻觉。</span>
                      </td>
                      <td className="p-4 align-top bg-slate-50/50">
                        <strong className="block text-indigo-900 mb-1">动态知识</strong>
                        <span className="text-indigo-800">通过工具连接外部系统（Search, Databases），拥有实时、动态且无限扩展的知识边界。通过 RAG 实现接地。</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 align-top">
                        <strong className="block text-slate-900 mb-1">交互模式</strong>
                        <span className="text-slate-600">通常是“输入-输出”的单次推理。虽然可以有上下文窗口，但本质上是被动响应者。</span>
                      </td>
                      <td className="p-4 align-top bg-slate-50/50">
                        <strong className="block text-indigo-900 mb-1">自主循环</strong>
                        <span className="text-indigo-800">管理会话历史和长期记忆，允许基于编排层的多轮推理和自我纠正，具有目标导向的自主性。</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 align-top">
                        <strong className="block text-slate-900 mb-1">工具使用</strong>
                        <span className="text-slate-600">无原生工具实现，仅能生成文本建议。</span>
                      </td>
                      <td className="p-4 align-top bg-slate-50/50">
                        <strong className="block text-indigo-900 mb-1">原生集成</strong>
                        <span className="text-indigo-800">工具调用是架构的一等公民，模型可以输出机器可读的代码（如 JSON）来触发实际动作。</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 align-top">
                        <strong className="block text-slate-900 mb-1">推理深度</strong>
                        <span className="text-slate-600">无内置逻辑层，依赖用户的 Prompt Engineering（如需要用户手动写出 CoT 指令）。</span>
                      </td>
                      <td className="p-4 align-top bg-slate-50/50">
                        <strong className="block text-indigo-900 mb-1">认知架构</strong>
                        <span className="text-indigo-800">内置 ReAct, CoT, LangChain 等框架作为系统级提示或代码逻辑，确保推理的稳定性和可解释性。</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )
        }
      ]
    },
    {
      id: "architecture",
      title: "4. 认知架构与推理机制详解",
      sections: [
        {
          id: "chef-analogy",
          title: "类比：主厨的工作流 (The Chef Analogy)",
          content: (
            <>
              <p className="mb-4">
                为了直观理解智能体复杂的认知过程，我们可以将其比作一位在繁忙专业厨房里工作的<strong>主厨</strong>。主厨的目标是为顾客制作完美的菜肴，这涉及到一个复杂的规划、执行、检查和调整的循环。
              </p>
              <div className="space-y-4 my-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-mono text-xs mt-1 border border-slate-300 w-24 text-center shrink-0">OBSERVATION</div>
                  <div>
                    <strong className="text-slate-900">收集信息（感知）：</strong>
                    <span className="text-slate-600">厨师查看顾客的订单（用户查询），检查冰箱里的现有食材（检索记忆/数据库）。</span>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-yellow-100 px-2 py-1 rounded text-yellow-800 font-mono text-xs mt-1 border border-yellow-300 w-24 text-center shrink-0">THOUGHT</div>
                  <div>
                    <strong className="text-slate-900">内部推理（规划）：</strong>
                    <span className="text-slate-600">“顾客要不含麸质的意面。我没有常规面条，但我可以用西葫芦做替代。这需要先处理蔬菜，然后用大火快炒。”（模型基于上下文生成计划）。</span>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-100 px-2 py-1 rounded text-blue-800 font-mono text-xs mt-1 border border-blue-300 w-24 text-center shrink-0">ACTION</div>
                  <div>
                    <strong className="text-slate-900">采取行动（执行）：</strong>
                    <span className="text-slate-600">厨师拿起刀切菜，开火加热平底锅（调用工具/API）。</span>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-green-100 px-2 py-1 rounded text-green-800 font-mono text-xs mt-1 border border-green-300 w-24 text-center shrink-0">REFLECTION</div>
                  <div>
                    <strong className="text-slate-900">调整与反馈（自省）：</strong>
                    <span className="text-slate-600">尝一口酱汁，“太咸了”。厨师决定加水稀释（基于工具返回结果的自我纠正）。这个过程确保了最终输出的质量。</span>
                  </div>
                </div>
              </div>
              <p>
                就像厨师一样，智能体使用认知架构，通过迭代处理信息、做出明智决策并根据先前的输出（Observation）完善下一步行动（Next Action），最终达成用户的目标。
              </p>
            </>
          )
        },
        {
          id: "reasoning-frameworks",
          title: "推理框架：构建智能体的“思维”",
          content: (
            <>
              <p className="mb-6">
                为了让大语言模型展现出复杂的规划能力，研究界提出了多种提示工程（Prompt Engineering）框架，这些框架实际上构成了智能体“思维”的基础：
              </p>
              <div className="space-y-6">
                <div className="border border-slate-200 rounded-lg p-5 hover:border-indigo-300 transition-colors bg-white">
                  <h4 className="font-bold text-lg mb-2 text-indigo-700 flex items-center gap-2">
                    <Layers size={20} /> ReAct (Reason + Act)
                  </h4>
                  <p className="text-sm text-slate-600 mb-2">
                    <strong>核心思想：</strong> 将“推理（Reasoning）”与“行动（Acting）”交织在一起。
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    模型被指示在执行任何物理行动（如调用 API）之前，先生成一个文本形式的“思考（Thought）”。这不仅让模型的行为可解释，还允许模型在行动失败时通过新的思考进行自我纠正。研究表明，ReAct 提示在多跳问答（Multi-hop QA）和事实验证任务上显著优于单纯的 CoT。
                  </p>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-5 hover:border-indigo-300 transition-colors bg-white">
                  <h4 className="font-bold text-lg mb-2 text-indigo-700 flex items-center gap-2">
                    <Code size={20} /> Chain-of-Thought (CoT)
                  </h4>
                  <p className="text-sm text-slate-600 mb-2">
                    <strong>核心思想：</strong> 通过生成一系列中间推理步骤来分解复杂问题。
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    类似于人类做数学题时写下步骤。CoT 可以显著提高模型在数学、常识推理和符号操作任务上的性能。它的变体包括<strong>自洽性 (Self-consistency)</strong>（生成多条思维链并投票选出最佳答案）和<strong>零样本 CoT (Zero-shot CoT)</strong>（仅通过添加“Let's think step by step”触发）。
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-5 hover:border-indigo-300 transition-colors bg-white">
                  <h4 className="font-bold text-lg mb-2 text-indigo-700 flex items-center gap-2">
                    <Database size={20} /> Tree-of-Thoughts (ToT)
                  </h4>
                  <p className="text-sm text-slate-600 mb-2">
                    <strong>核心思想：</strong> 允许模型探索多种可能性的分支，进行战略性前瞻。
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    ToT 概括了 CoT，将思维看作一棵树。模型可以生成多个可能的下一步，自我评估每个步骤的前景，并使用搜索算法（如 BFS 广度优先搜索或 DFS 深度优先搜索）来决定是继续深入当前分支还是回溯。这非常适合需要复杂规划或探索性写作的任务。
                  </p>
                </div>
              </div>
            </>
          )
        },
        {
          id: "react-example",
          title: "实战：ReAct 流程深度解析",
          content: (
            <div className="space-y-4">
              <p className="text-slate-600 mb-4">
                以下是一个真实的 ReAct 循环示例，展示了智能体如何处理“预订航班”这一复杂请求。请注意模型是如何在“思考（Thought）”、“行动（Action）”和“观察（Observation）”之间切换的。
              </p>
              <div className="bg-slate-900 text-slate-300 p-6 rounded-lg font-mono text-sm shadow-xl leading-relaxed overflow-x-auto border border-slate-800">
                <div className="mb-4 text-green-400 font-bold border-b border-slate-700 pb-2">Task: "我想预订下周二从奥斯汀 (Austin) 飞往苏黎世 (Zurich) 的航班，越便宜越好。"</div>
                
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="pl-4 border-l-2 border-yellow-500">
                    <div className="text-yellow-400 font-bold opacity-80 mb-1">Thought 1:</div>
                    <div className="mb-2 text-slate-200">用户想要预订航班。我需要先找出下周二的具体日期，然后搜索该日期的航班价格。</div>
                    <div className="text-blue-400 font-bold opacity-80 mb-1">Action 1:</div>
                    <div className="text-white bg-slate-800 p-2 rounded inline-block">CalendarTool.getCurrentDate()</div>
                  </div>

                  {/* Step 2 */}
                  <div className="pl-4 border-l-2 border-purple-500 bg-slate-800/30 py-3 rounded-r">
                    <div className="text-purple-400 font-bold opacity-80 mb-1">Observation 1:</div>
                    <div className="text-slate-300">2023-10-15 (Sunday)</div>
                  </div>

                  {/* Step 3 */}
                  <div className="pl-4 border-l-2 border-yellow-500">
                    <div className="text-yellow-400 font-bold opacity-80 mb-1">Thought 2:</div>
                    <div className="mb-2 text-slate-200">今天是10月15日周日。下周二应该是10月24日。现在我可以使用航班搜索工具查询 AUS 到 ZRH 的航班。</div>
                    <div className="text-blue-400 font-bold opacity-80 mb-1">Action 2:</div>
                    <div className="text-white bg-slate-800 p-2 rounded inline-block">FlightsTool.search(origin="AUS", dest="ZRH", date="2023-10-24", sort="price_asc")</div>
                  </div>

                  {/* Step 4 */}
                  <div className="pl-4 border-l-2 border-purple-500 bg-slate-800/30 py-3 rounded-r">
                    <div className="text-purple-400 font-bold opacity-80 mb-1">Observation 2:</div>
                    <div className="text-slate-300">Found 3 flights: 1. Delta ($800, 2 stops), 2. United ($850, 1 stop), 3. Swiss Air ($1200, Direct).</div>
                  </div>

                  {/* Step 5 */}
                  <div className="pl-4 border-l-2 border-yellow-500">
                    <div className="text-yellow-400 font-bold opacity-80 mb-1">Thought 3:</div>
                    <div className="mb-2 text-slate-200">用户强调“越便宜越好”。最便宜的是 Delta 航班，800美元，但有2次经停。我应该向用户展示这个选项，同时也提供 United 的选项作为备选，因为它只贵一点但少一次经停。</div>
                    <div className="text-green-400 font-bold opacity-80 mb-1">Final Answer:</div>
                    <div className="text-white font-medium">我为您找到了几个选项。最便宜的是 Delta 航空，价格为 $800，但需要两次转机。如果您介意转机次数，United 航空的价格为 $850，仅需一次转机。您想预订哪一个？</div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: "tool-types",
      title: "5. 技术实现：扩展、函数与数据存储",
      sections: [
        {
          id: "extensions",
          title: "扩展 (Extensions)：API 适配器",
          content: (
            <>
              <p className="mb-4">
                <strong>扩展 (Extensions)</strong> 是一种将外部 API 与智能体标准化的机制。在 Google Vertex AI 等生态系统中，扩展充当了 API 和模型之间的“适配器”。
              </p>
              <p className="mb-4">
                扩展的主要优势在于它封装了 API 的复杂性。您只需提供 OpenAPI 规范（Swagger），智能体就能理解如何构造请求。Google 提供了一些强大的预构建扩展，例如 <strong>Code Interpreter (代码解释器)</strong>。
              </p>
              <div className="my-4 p-4 bg-slate-50 border-l-4 border-indigo-500">
                <h5 className="font-bold text-indigo-800 mb-1">案例研究：Code Interpreter</h5>
                <p className="text-slate-600 text-sm">
                  代码解释器允许智能体在安全的沙箱环境中编写和执行 Python 代码。这使得智能体能够处理它本身不擅长的任务，如精确的数学计算、数据可视化（生成图表）或复杂的数据转换（如将 CSV 转为 JSON）。
                </p>
              </div>
              <CodeBlock language="python" code={`# Code Interpreter 使用示例 (Python)
# 场景：用户要求反转二叉树，并分析其时间复杂度

from vertexai.preview.extensions import Extension

# 加载预置的代码解释器扩展
extension_code_interpreter = Extension.from_hub("code_interpreter")

CODE_QUERY = """
Write a python method to invert a binary tree. 
Then, write a test case to verify it works.
Finally, explain the time complexity in the comments.
"""

# 执行扩展
response = extension_code_interpreter.execute(
    operation_id = "generate_and_execute",
    operation_params = {"query": CODE_QUERY}
)

# 输出生成的代码和执行结果
print(response['generated_code'])
print(response['execution_result'])`} />
            </>
          )
        },
        {
          id: "functions",
          title: "函数调用 (Function Calling)：客户端控制",
          content: (
            <>
              <p className="mb-4">
                <strong>函数调用 (Function Calling)</strong> 提供了比扩展更细粒度的控制。它不是在服务器端自动执行 API，而是让模型输出结构化的 JSON 对象，指明它<i>想要</i>调用的函数名称和参数。
              </p>
              <p className="mb-4">
                这种机制具有独特的优势，特别是在企业级应用中：
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-700">
                <li><strong>Human-in-the-loop (人在回路)</strong>：实际的函数执行发生在您的客户端代码中。您可以在执行前验证参数，或要求用户确认（例如“您确定要转账 $1000 吗？”）。</li>
                <li><strong>私有网络访问</strong>：因为执行在您的环境中，您可以调用无法暴露给公网的内部 API 或本地数据库。</li>
                <li><strong>灵活性</strong>：可以将模型输出的 JSON 用于 API 调用以外的用途，如前端 UI 组件渲染或 SQL 查询构建。</li>
              </ul>
              <CodeBlock language="python" code={`# 函数定义 (Function Declaration)
# 告诉模型有哪些工具可用
tools = [
    {
        "name": "display_cities",
        "description": "根据用户的搜索查询和偏好提供建议的城市列表。",
        "parameters": {
            "type": "object",
            "properties": {
                "cities": {"type": "array", "items": {"type": "string"}},
                "preferences": {"type": "string", "description": "用户偏好，如 'skiing', 'beach'"}
            },
            "required": ["cities"]
        }
    }
]

# 模型响应 (Model Response)
# 模型并不直接运行代码，而是返回这个 JSON
{
    "function_call": {
        "name": "display_cities",
        "args": {
            "cities": ["Aspen", "Vail", "Park City"],
            "preferences": "skiing"
        }
    }
}

# 您的代码 (Client Code)
# 1. 接收 JSON 
# 2. 执行本地函数 display_cities(...)
# 3. 将结果返还给模型以生成最终自然语言回复`} />
            </>
          )
        },
        {
          id: "data-stores",
          title: "数据存储与 RAG：解决幻觉问题",
          content: (
            <>
              <p className="mb-4">
                为了解决模型“幻觉”（Hallucination）和知识过时的问题，我们将<strong>数据存储 (Data Stores)</strong> 引入架构。这通常通过<strong>检索增强生成 (RAG - Retrieval Augmented Generation)</strong> 来实现。
              </p>
              <p className="mb-4">
                数据存储不仅限于非结构化文本（PDF, Wiki），也可以是结构化数据。核心流程是将知识转化为<strong>向量嵌入 (Vector Embeddings)</strong> 并存储在向量数据库中。当用户提问时，系统首先在数据库中进行语义搜索，找到最相关的片段，并将其作为“上下文”注入到 Prompt 中。
              </p>
              <DiagramPlaceholder title="RAG 端到端工作流">
                <div className="flex flex-col gap-6 w-full max-w-lg text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-slate-50 border p-3 rounded flex flex-col items-center">
                      <span className="text-xs text-slate-500 mb-1">Input</span>
                      <span className="font-bold">用户查询</span>
                      <div className="text-[10px] text-slate-400 mt-1">"公司去年的 Q3 营收是多少？"</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight className="text-indigo-400" />
                    </div>
                    <div className="bg-indigo-50 border border-indigo-200 p-3 rounded flex flex-col items-center">
                      <span className="text-xs text-indigo-500 mb-1">Encoding</span>
                      <span className="font-bold text-indigo-700">生成查询向量</span>
                      <div className="text-[10px] text-indigo-400 mt-1">Embedding Model</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-dashed border-slate-300"></div>

                  <div className="flex flex-col items-center bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="font-bold text-yellow-800 mb-2">向量数据库 (Vector DB)</div>
                    <p className="text-xs text-yellow-700 mb-2">进行相似度搜索 (Similarity Search / ANN)</p>
                    <div className="flex gap-2">
                      <span className="bg-white px-2 py-1 rounded text-xs shadow-sm border">Doc A: 0.89</span>
                      <span className="bg-white px-2 py-1 rounded text-xs shadow-sm border">Doc B: 0.12</span>
                      <span className="bg-white px-2 py-1 rounded text-xs shadow-sm border border-indigo-300 bg-indigo-50 text-indigo-700 font-bold">Doc C: 0.92</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-slate-300"></div>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center shadow-sm">
                    <span className="font-bold text-green-800 block mb-2">上下文注入 (Context Injection)</span>
                    <p className="text-xs text-green-700 font-mono bg-white p-2 rounded border border-green-100">
                      Prompt = 用户查询 + <span className="font-bold underline decoration-wavy">检索到的 Doc C 内容</span>
                    </p>
                  </div>
                </div>
              </DiagramPlaceholder>
              <p>
                <strong>接地 (Grounding)</strong>：RAG 的一个关键作用是“接地”，即强制模型的回答必须基于检索到的事实依据，并提供引用来源（Citations），从而极大降低了在企业应用中不可接受的胡编乱造风险。
              </p>
            </>
          )
        }
      ]
    },
    {
      id: "production",
      title: "6. 生产级应用与未来展望",
      sections: [
        {
          id: "enhancing",
          title: "模型优化策略：从 Prompt 到 Fine-tuning",
          content: (
            <>
              <p className="mb-6">
                在构建智能体时，我们通常遵循一个渐进式的优化路径，从简单的提示工程到复杂的模型微调。这被称为“性能提升金字塔”：
              </p>
              <ul className="space-y-4">
                <li className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-indigo-600 text-lg">1. 上下文学习 (In-context Learning)</strong>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Level 1: 成本最低</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    在推理时为模型提供提示（Prompt）、工具定义和<strong>少样本示例 (Few-shot examples)</strong>。这不需要重新训练模型，模型通过阅读 Prompt 中的示例来“即时”学习如何完成任务。这是开发智能体的第一步，也是迭代最快的方法。
                  </p>
                </li>
                <li className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-indigo-600 text-lg">2. 基于检索的上下文学习 (RAG)</strong>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-bold">Level 2: 动态知识</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    当 Prompt 的长度限制（Context Window）无法容纳所有知识时，或者知识频繁更新时使用。通过从外部数据库动态检索最相关的信息片段（Chunk）填充到 Prompt 中，扩展了模型的有效内存。这是目前企业应用的主流模式。
                  </p>
                </li>
                <li className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-indigo-600 text-lg">3. 基于微调的学习 (Fine-tuning)</strong>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-bold">Level 3: 最高性能</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    使用特定的数据集（如特定的代码库、法律文书或独特的对话风格）重新训练模型权重的部分层（PEFT/LoRA）。这适合当 Prompt 工程无法达到预期的特定格式遵循度（Formatting Adherence）或推理深度时。微调后的模型通常更小、更快，且能内化特定领域的知识，减少对 Prompt 长度的依赖。
                  </p>
                </li>
              </ul>
            </>
          )
        },
        {
          id: "summary",
          title: "总结与未来：多智能体协作",
          content: (
            <>
              <p className="mb-4 font-serif text-lg leading-relaxed text-slate-700">
                生成式 AI 智能体代表了人工智能从“被动回答”向“主动解决问题”的跨越。它赋予了模型感知环境、使用工具和规划行动的能力。
              </p>
              <p className="mb-4">
                随着认知架构的成熟，我们正在见证从单一通用智能体向<strong>多智能体系统 (Multi-Agent Systems)</strong> 的演进。
              </p>
              <div className="bg-indigo-900 text-indigo-100 p-6 rounded-xl my-6 shadow-lg">
                <h5 className="font-bold text-xl mb-3 flex items-center gap-2">
                  <Layers className="text-indigo-400"/> 智能体链 (Agent Chaining)
                </h5>
                <p className="text-sm opacity-90 leading-relaxed">
                  通过结合专业智能体——例如一个“研究员智能体”负责搜集信息，一个“分析师智能体”负责处理数据，以及一个“作家智能体”负责撰写报告——我们可以创建一种“专家混合 (Mixture of Experts)”的团队结构。
                </p>
                <div className="mt-4 pt-4 border-t border-indigo-800">
                  <p className="text-sm opacity-90 leading-relaxed">
                    这种分工协作不仅提高了复杂任务的成功率，还使得系统的调试和优化变得更加模块化和可控。未来，人类的角色将更多地转变为智能体团队的管理者（Manager）和目标设定者（Goal Setter），而非执行者。
                  </p>
                </div>
              </div>
            </>
          )
        }
      ]
    }
  ]
};

// Extract plain text content for AI RAG context
export const getPlainTextContent = (): string => {
  let text = `DOCUMENT TITLE: ${bookContent.title}\nAUTHORS: ${bookContent.authors.join(", ")}\nDATE: ${bookContent.date}\n\n`;
  
  // A manually curated, text-only dump of the full content above to ensure the AI assistant has access to the exact text.
  // This is necessary because we can't easily extract text from React components server-side in this environment.
  text += `
  [FULL CONTENT TRANSCRIPT]

  CHAPTER 1: 范式转变：从模型到智能体
  1.1 引言：超越生成
  将理性推理（Reasoning）、逻辑规划能力与连接外部信息源的机制相结合，标志着生成式 AI 从单纯的内容生成器向“智能体 (Agent)”的范式转变。
  人类大脑天生擅长处理非结构化数据和复杂的模式识别任务。然而，在进行关键决策或得出结论之前，我们通常需要依赖外部工具——如查阅书籍获取知识、使用谷歌搜索验证事实、或利用计算器进行精确的数学运算——来补充我们大脑中已有的知识储备并扩展我们的能力边界。
  同理，生成式 AI 模型（LLMs）也可以被训练去使用工具。这使它们能够突破训练数据的静态限制，访问实时信息或建议现实世界的行动。例如，模型可以利用数据库检索工具 (Database Retrieval Tool) 访问特定领域的私有信息（如企业的客户购买历史 CRM 数据），从而生成高度个性化且准确的购物建议。
  更进一步，基于用户的模糊意图（Intent），模型可以进行一系列复杂的 API 调用编排。例如，它可以自动向同事发送起草好的电子邮件回复，或代表用户在银行系统中完成多步金融交易验证。要实现这一愿景，模型不仅必须拥有访问外部工具集的权限，更核心的是，它需要具备认知架构 (Cognitive Architecture)——即以自主方式规划任务、分解步骤、反思结果并最终执行的能力。

  1.2 定义：什么是智能体 (Agent)？
  在其最基本的形式中，生成式 AI 智能体可以定义为一个应用程序：它通过传感器或输入接口观察世界（Perception），利用其掌握的工具集（Tools）对世界产生影响（Action），从而致力于实现某个特定的目标（Goal）。
  核心特性：
  - 自主性 (Autonomy)：智能体可以独立于人工干预进行操作。特别是在被赋予了明确的高层目标时，它不需要人类指挥每一步微小的操作。
  - 主动性 (Proactivity)：智能体在实现目标的方法上是主动的。即使没有人类提供的详尽标准作业程序（SOP），智能体也能通过推理 (Reasoning) 推导出为了实现最终目标，当前时刻应该采取的最佳行动是什么。
  认知架构组件：用户查询 -> 智能体运行时 (Agent Runtime) -> 编排层 (Orchestration) [包含 记忆 Memory, 模型 Model] -> 工具集 (Tools)。

  CHAPTER 2: 核心组件深度解析
  2.1 模型 (The Model)：推理引擎
  在智能体的架构中，模型（通常是大型语言模型 LLM）不仅是文本生成器，更是作为核心决策者（Decision Maker）的推理引擎。它类似于计算机的 CPU，负责处理信息、进行逻辑判断和分发指令。
  推理范式：
  - ReAct (Reason + Act)：一种结合了内部推理（Reasoning）和外部行动（Action）生成的范式。模型在执行动作前会先生成“思考痕迹”。
  - CoT (Chain-of-Thought)：思维链技术，通过让模型展示逐步的思考过程来处理复杂任务。
  - ToT (Tree-of-Thoughts)：思维树，允许模型探索多种可能性的分支，并回溯评估。
  最佳实践：选择模型时不仅要考虑参数量，还要考虑其是否针对工具调用 (Function Calling) 进行了微调。

  2.2 工具 (The Tools)：感知与接地
  基础模型局限性：知识静态性（截止于训练时间）、环境隔离（沙箱中）。
  工具的作用：
  - 接地 (Grounding)：利用检索增强生成 (RAG) 系统访问私有知识库，减少幻觉。
  - 交互 (Interaction)：通过 Web API 与企业系统进行双向交互。
  - 计算 (Computation)：调用代码解释器执行精确运算。

  2.3 编排层 (Orchestration)：循环控制系统
  编排层是神经系统，定义了智能体如何运作的“循环机制 (The Loop)”。
  循环步骤：
  1. 感知 (Observation)：接收用户输入或工具结果。
  2. 推理 (Reasoning)：利用 LLM 分析当前状态，结合记忆，规划行动。
  3. 决策 (Decision)：决定是继续调用工具、提问还是输出答案。
  4. 执行 (Execution)：实际调用 API 或生成回复。

  CHAPTER 3: 辨析：智能体 vs 模型
  模型知识静态，智能体知识动态（通过工具，RAG接地）。
  模型交互是被动的（输入-输出），智能体是自主循环（多轮推理，目标导向）。
  模型无原生工具，智能体原生集成工具（输出机器可读代码）。
  模型无内置逻辑层，智能体拥有认知架构（ReAct, CoT 框架）。

  CHAPTER 4: 认知架构与推理机制详解
  4.1 类比：主厨的工作流
  收集信息（感知）：查看订单，检查食材。
  内部推理（规划）：没有面条，用西葫芦替代。
  采取行动（执行）：切菜，烹饪。
  调整与反馈（自省）：尝味道，调整调料。
  智能体通过迭代处理信息、做出决策并根据反馈调整，最终达成目标。

  4.2 推理框架
  - ReAct: 推理与行动交织。在多跳问答和事实验证上优于 CoT。
  - CoT: 分解步骤。提高数学和常识推理能力。包含 Self-consistency 和 Zero-shot CoT。
  - ToT: 树状搜索（BFS/DFS）。适合复杂规划。

  CHAPTER 5: 技术实现：扩展、函数与数据存储
  5.1 扩展 (Extensions)
  API 适配器。封装复杂性，只需提供 OpenAPI 规范。例如 Code Interpreter（代码解释器）用于沙箱执行 Python 代码。

  5.2 函数调用 (Function Calling)
  客户端控制。模型输出 JSON，客户端执行。
  优势：Human-in-the-loop（人在回路，安全验证）、私有网络访问、灵活性。

  5.3 数据存储与 RAG
  解决幻觉。流程：用户查询 -> 生成向量 -> 向量数据库相似度搜索 -> 上下文注入 Prompt。
  接地 (Grounding)：强制模型回答基于检索到的事实，提供引用。

  CHAPTER 6: 生产级应用与未来展望
  6.1 模型优化策略
  Level 1: 上下文学习 (In-context Learning) - Prompt Engineering, Few-shot. 成本最低。
  Level 2: RAG - 动态检索知识。扩展有效内存。
  Level 3: 微调 (Fine-tuning) - 特定数据集训练。最高性能，内化领域知识。

  6.2 未来：多智能体协作
  从单一智能体向多智能体系统 (Multi-Agent Systems) 演进。
  智能体链 (Agent Chaining)：专家混合 (Mixture of Experts) 结构。研究员、分析师、作家智能体分工协作。
  人类角色转变为管理者和目标设定者。
  `;
  
  return text;
};