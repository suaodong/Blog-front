<script setup lang="ts">
</script>

<template>
  <div class="relative min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- A thin editorial strapline + ticker -->
      <div class="animate-fade-in-up">
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-2 rounded-full px-3 py-1 border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_70%,transparent)]">
            <span class="h-2 w-2 rounded-full bg-(--accent)"></span>
            <span class="text-xs tracking-[0.22em] uppercase text-(--muted)">ANTIGRAVITY · Personal Notes</span>
          </span>
          <span class="hidden sm:inline text-xs tracking-[0.22em] uppercase text-(--muted-2)">
            建造可复用的经验 · 记录真实的过程
          </span>
        </div>

        <div class="mt-4 overflow-hidden border-y border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_55%,transparent)]">
          <div class="ticker py-2">
            <div class="ticker__inner text-xs tracking-[0.28em] uppercase text-(--muted)">
              <span class="mx-6">Front-end</span>
              <span class="mx-6">Engineering</span>
              <span class="mx-6">Architecture</span>
              <span class="mx-6">Writing</span>
              <span class="mx-6">Review</span>
              <span class="mx-6">Design Taste</span>
              <span class="mx-6">Systems</span>
              <span class="mx-6">Tooling</span>
              <span class="mx-6">Front-end</span>
              <span class="mx-6">Engineering</span>
              <span class="mx-6">Architecture</span>
              <span class="mx-6">Writing</span>
              <span class="mx-6">Review</span>
              <span class="mx-6">Design Taste</span>
              <span class="mx-6">Systems</span>
              <span class="mx-6">Tooling</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main editorial grid -->
      <div class="mt-10 grid lg:grid-cols-12 gap-8 items-start">
        <!-- Left rail: index -->
        <aside class="lg:col-span-3 order-2 lg:order-1 animate-fade-in-up delay-100">
          <div class="sticky top-24 space-y-4">
            <div class="rounded-2xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel-strong)_82%,transparent)] p-5 shadow-(--shadow)">
              <div class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">Index</div>
              <div class="mt-3 space-y-2 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-(--muted)">写什么</span>
                  <span class="font-semibold">工程化 / 架构 / 复盘</span>
                </div>
                <div class="h-px bg-[color-mix(in_oklab,var(--stroke)_70%,transparent)]"></div>
                <div class="flex items-center justify-between">
                  <span class="text-(--muted)">怎么写</span>
                  <span class="font-semibold">逻辑清楚 · 结论明确</span>
                </div>
                <div class="h-px bg-[color-mix(in_oklab,var(--stroke)_70%,transparent)]"></div>
                <div class="flex items-center justify-between">
                  <span class="text-(--muted)">阅读</span>
                  <span class="font-semibold">护眼 / 暗黑</span>
                </div>
              </div>
            </div>

            <div class="rounded-2xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_70%,transparent)] p-5">
              <div class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">Rules</div>
              <ul class="mt-3 space-y-2 text-sm text-(--muted)">
                <li>写过程，不装懂。</li>
                <li>写结论，也写为什么。</li>
                <li>能复用的，才值得记录。</li>
              </ul>
            </div>
          </div>
        </aside>

        <!-- Hero block -->
        <section class="lg:col-span-6 order-1 lg:order-2">
          <div class="relative rounded-4xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel-strong)_80%,transparent)] backdrop-blur-md p-7 sm:p-9 shadow-(--shadow) overflow-hidden animate-fade-in-up delay-100">
            <div aria-hidden="true" class="absolute -top-16 -right-20 h-80 w-80 rounded-full blur-3xl opacity-55 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--accent)_45%,transparent),transparent_65%)]"></div>
            <div aria-hidden="true" class="absolute -bottom-20 -left-24 h-104 w-104 rounded-full blur-3xl opacity-45 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--accent-2)_42%,transparent),transparent_65%)]"></div>

            <div class="relative">
              <div class="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-(--muted-2)">
                <span class="inline-flex items-center gap-2">
                  <span class="h-1.5 w-1.5 rounded-full bg-(--accent)"></span>
                  Latest note
                </span>
                <span class="opacity-60">/</span>
                <span>持续更新</span>
              </div>

              <h1
                class="mt-5 text-5xl sm:text-6xl leading-[0.92] tracking-tight"
                style="font-family: var(--font-display)"
              >
                把经验写成
                <span class="bg-clip-text text-transparent bg-[linear-gradient(110deg,var(--text),color-mix(in_oklab,var(--accent)_60%,var(--text))_45%,var(--text))]">
                  可复用的组件
                </span>
              </h1>

              <p class="mt-6 text-lg leading-relaxed text-(--muted) max-w-xl">
                这里是我的个人博客。写前端与工程化，也写架构与复盘；写清楚“怎么做”，更写清楚“为什么”。
              </p>

              <div class="mt-8 flex flex-col sm:flex-row gap-3">
                <router-link
                  to="/categories/1"
                  class="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-(--accent) shadow-(--shadow) hover:-translate-y-px transition-all"
                >
                  开始阅读
                  <span class="transition-transform group-hover:translate-x-0.5">→</span>
                </router-link>
                <router-link
                  to="/about"
                  class="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_78%,transparent)] text-(--text) hover:bg-[color-mix(in_oklab,var(--panel)_92%,transparent)] transition-colors"
                >
                  关于本站
                </router-link>
              </div>

              <div class="mt-8 grid grid-cols-3 gap-3">
                <div class="rounded-2xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_72%,transparent)] p-4">
                  <div class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">Focus</div>
                  <div class="mt-1 text-sm font-semibold">可落地</div>
                </div>
                <div class="rounded-2xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_72%,transparent)] p-4">
                  <div class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">Tone</div>
                  <div class="mt-1 text-sm font-semibold">克制但锋利</div>
                </div>
                <div class="rounded-2xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_72%,transparent)] p-4">
                  <div class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">Cadence</div>
                  <div class="mt-1 text-sm font-semibold">持续更新</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Right: messy notes collage -->
        <aside class="lg:col-span-3 order-3 animate-fade-in-up delay-200">
          <div class="relative">
            <div class="absolute -top-3 -left-2 rotate-[-7deg] rounded-2xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_86%,transparent)] p-4 shadow-(--shadow) w-[92%]">
              <div class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">Note</div>
              <div class="mt-2 text-sm text-(--muted)">
                每篇文章尽量做到：一眼看懂结论，一路走到推导。
              </div>
              <div class="mt-3 text-xs text-(--muted-2)">— 写作原则</div>
            </div>

            <div class="relative mt-24 rotate-3 rounded-3xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel-strong)_84%,transparent)] p-5 shadow-(--shadow)">
              <div class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">What you’ll find</div>
              <div class="mt-3 space-y-2 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-(--muted)">工程化</span>
                  <span class="font-semibold">构建 / 规范 / 性能</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-(--muted)">业务</span>
                  <span class="font-semibold">抽象 / 演进 / 抉择</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-(--muted)">审美</span>
                  <span class="font-semibold">排版 / 交互 / 气质</span>
                </div>
              </div>
            </div>

            <div class="absolute -bottom-10 right-0 rotate-10 rounded-2xl border border-(--stroke) bg-[color-mix(in_oklab,var(--panel)_88%,transparent)] p-4 shadow-(--shadow) w-[78%]">
              <div class="text-xs tracking-[0.22em] uppercase text-(--muted-2)">Promise</div>
              <div class="mt-2 text-sm font-semibold" style="font-family: var(--font-display)">
                少走弯路，多一点确定感
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div class="mt-16 text-xs tracking-[0.22em] uppercase text-(--muted-2) animate-fade-in-up delay-300">
        Tip: 在任意分类页用右上角搜索（URL 会带上 `?q=`）
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0; /* Start hidden */
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}

.ticker {
  width: 100%;
}
.ticker__inner {
  display: inline-flex;
  white-space: nowrap;
  will-change: transform;
  animation: tickerMove 22s linear infinite;
}
@keyframes tickerMove {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
