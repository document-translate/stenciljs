<script lang="jsx">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    // type HighlightVariant = 'none' | 'init' | 'update' | 'removed' | 'attached';
    const highlight = ref("none");
    const setHighlight = (val) => {
      highlight.value = val;
    };

    return () => {
      const highlightClassName =
        highlight.value === "none"
          ? ""
          : ` highlight ${`highlight-${highlight.value}`}`;

      return (
        <div class={`lifecycleChart` + highlightClassName}>
          <svg
            version="1.1"
            viewBox="0 0 642.5 922"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fillRule="evenodd">
              <g fill="none" strokeLinecap="square">
                <path
                  d="m552 743c49.706 0 90-40.294 90-90v-488c0-58.5-47.2-106-105.5-106-58.393 0.16547-105.61 47.607-105.5 106l0.4 68"
                  stroke="#7b83a6"
                  class="pathUpdate"
                />
                <path
                  d="m437.7 600.3-6.3 6.3-6.3-6.3"
                  stroke="#b3b6c5"
                  class="pathUpdate"
                />
                <path
                  d="m431.4 347.5v258"
                  stroke="#7b83a6"
                  class="pathUpdate"
                />
                <path
                  d="m431.4 282.5v24.337"
                  stroke="#7b83a6"
                  strokeDasharray="1, 6"
                  class="pathUpdate"
                />
                <path d="m126.4 50v555.5" stroke="#212431" class="pathInit" />
                <path
                  d="m132.7 600.3-6.3 6.3-6.3-6.3"
                  stroke="#212431"
                  class="pathInit"
                />
                <path d="m278 50v27.5" stroke="#575e7f" class="pathAttached" />
                <path
                  d="m284.3 71.993-6.3 6.3-6.3-6.3"
                  stroke="#575e7f"
                  class="pathAttached"
                />
                <path
                  d="m278.5 829v29.5"
                  stroke="#575e7f"
                  class="pathRemoved"
                />
                <path
                  d="m284.8 852.3-6.3 6.3-6.3-6.3"
                  stroke="#575e7f"
                  class="pathRemoved"
                />
                <g
                  fontFamily="SFMono-Regular, 'SF Mono', 'Lucida Console', monospace"
                  fontSize="15px"
                >
                  <g>
                    <a href="#componentdidload" class="pathInit">
                      <rect
                        y="620"
                        width="252"
                        height="49"
                        rx="24.5"
                        ry="24.5"
                        fill="#212431"
                      />
                      <text x="2.2028809" y="166.83597" fill="#fff">
                        <tspan x="45.202881" y="648.83594">
                          componentDidLoad()
                        </tspan>
                      </text>
                    </a>
                  </g>
                  <g>
                    <a href="#componentdidupdate" class="pathUpdate">
                      <rect
                        x="303"
                        y="620"
                        width="252"
                        height="49"
                        rx="24.5"
                        ry="24.5"
                        fill="#7b83a6"
                      />
                      <text x="2.8501587" y="166.83597" fill="#fff">
                        <tspan x="339.15015" y="648.83594">
                          componentDidUpdate()
                        </tspan>
                      </text>
                    </a>
                  </g>
                  <g>
                    <a href="#disconnectedcallback" class="pathRemoved">
                      <rect
                        x="152.5"
                        y="873"
                        width="252"
                        height="49"
                        rx="24.5"
                        ry="24.5"
                        fill="#4b516e"
                      />
                      <text x="-18.570755" y="148.19852" fill="#fff">
                        <tspan x="179.72925" y="902.19849">
                          disconnectedCallback()
                        </tspan>
                      </text>
                    </a>
                  </g>
                  <g>
                    <a href="reactive-data#watch-decorator" class="pathUpdate">
                      <rect
                        x="303"
                        y="161"
                        width="252"
                        height="49"
                        rx="24.5"
                        ry="24.5"
                        fill="#7b83a6"
                      />
                      <text x="2.5288086" y="-8" fill="#fff">
                        <tspan x="348.52881" y="190">
                          @Watch(‘propName’)
                        </tspan>
                      </text>
                    </a>
                  </g>
                  <g>
                    <a href="templating-jsx" class="pathInit pathUpdate">
                      <rect
                        y="451"
                        width="555"
                        height="49"
                        rx="24.5"
                        ry="24.5"
                        fill="#39b54a"
                      />
                      <text x="1.035553" y="109.1985" fill="#fff">
                        <tspan x="241.43555" y="480.19852">
                          render()
                        </tspan>
                      </text>
                    </a>
                  </g>
                  <g>
                    <a href="#connectedcallback" class="pathInit pathAttached">
                      <rect
                        x="65"
                        y="89"
                        width="275"
                        height="49"
                        rx="24.5"
                        ry="24.5"
                        fill="#4b516e"
                      />
                      <text x="78.77652" y="26.198486" fill="#fff">
                        <tspan x="117.17651" y="118.19849">
                          connectedCallback()
                        </tspan>
                      </text>
                    </a>
                  </g>
                  <g>
                    <a href="#componentshouldupdate" class="pathUpdate">
                      <rect
                        x="303"
                        y="233"
                        width="252"
                        height="49"
                        rx="24.5"
                        ry="24.5"
                        fill="#7b83a6"
                      />
                      <text x="-6.5288005" y="2.8359385" fill="#fff">
                        <tspan x="325.57117" y="261.83594">
                          componentShouldUpdate()
                        </tspan>
                      </text>
                    </a>
                  </g>
                  <g>
                    <a href="#componentwillrender" class="pathInit pathUpdate">
                      <rect
                        x="77.5"
                        y="377"
                        width="400"
                        height="49"
                        rx="24.5"
                        ry="24.5"
                        fill="#4b516e"
                      />
                      <text x="-148.97623" y="146.83594" fill="#fff">
                        <tspan x="183.12378" y="405.83594">
                          componentWillRender()
                        </tspan>
                      </text>
                    </a>
                  </g>
                  <g>
                    <a href="#componentwillupdate" class="pathUpdate">
                      <rect
                        x="303"
                        y="305"
                        width="252"
                        height="49"
                        rx="24.5"
                        ry="24.5"
                        fill="#7b83a6"
                      />
                      <text x="2.5237732" y="74.835938" fill="#fff">
                        <tspan x="334.62378" y="333.83594">
                          componentWillUpdate()
                        </tspan>
                      </text>
                    </a>
                  </g>
                  <g>
                    <a href="#componentdidrender" class="pathInit pathUpdate">
                      <rect
                        x="77.5"
                        y="523"
                        width="400"
                        height="49"
                        rx="24.5"
                        ry="24.5"
                        fill="#4b516e"
                      />
                      <text x="-144.44986" y="292.83597" fill="#fff">
                        <tspan x="187.65015" y="551.83594">
                          componentDidRender()
                        </tspan>
                      </text>
                    </a>
                  </g>
                  <g>
                    <a href="#componentwillload" class="pathInit">
                      <rect
                        y="161"
                        width="252"
                        height="49"
                        rx="24.5"
                        ry="24.5"
                        fill="#212431"
                      />
                      <text x="2.2765121" y="97.835938" fill="#fff">
                        <tspan x="40.676514" y="189.83594">
                          componentWillLoad()
                        </tspan>
                      </text>
                    </a>
                  </g>
                </g>
                <g fontSize="14px" letterSpacing="-.2" textAnchor="middle">
                  <g
                    class="trigger path-init"
                    onMouseover={() => setHighlight("init")}
                    onMouseout={() => setHighlight("none")}
                  >
                    <rect
                      width="190"
                      height="50"
                      rx="4"
                      ry="4"
                      fill="#fdf5e4"
                    />
                    <text x="111.24316" y="-1.0898438" fill="#9a6400">
                      <tspan x="14" y="28.910156">
                        Component initialized
                      </tspan>
                    </text>
                  </g>
                  <g
                    class="trigger path-update"
                    onMouseover={() => setHighlight("update")}
                    onMouseout={() => setHighlight("none")}
                  >
                    <rect
                      x="1"
                      y="718"
                      width="555"
                      height="50"
                      rx="4"
                      ry="4"
                      fill="#fdf5e4"
                    />
                    <text x="344.75723" y="166.90677" fill="#9a6400">
                      <tspan x="78.08643" y="746.90674">
                        Change in a value of prop or state triggers rerender
                      </tspan>
                    </text>
                  </g>
                  <g
                    class="trigger path-removed"
                    onMouseover={() => setHighlight("removed")}
                    onMouseout={() => setHighlight("none")}
                  >
                    <rect
                      x="1"
                      y="779"
                      width="555"
                      height="50"
                      rx="4"
                      ry="4"
                      fill="#fdf5e4"
                    />
                    <text x="138.02324" y="167.91019" fill="#9a6400">
                      <tspan x="204" y="807.91016">
                        Component removed
                      </tspan>
                    </text>
                  </g>
                  <g
                    class="trigger path-attached"
                    onMouseover={() => setHighlight("attached")}
                    onMouseout={() => setHighlight("none")}
                  >
                    <rect
                      x="215"
                      width="190"
                      height="50"
                      rx="4"
                      ry="4"
                      fill="#fdf5e4"
                    />
                    <text x="330.85489" y="-1.0898438" fill="#9a6400">
                      <tspan x="222" y="28.910156">
                        Component reattached
                      </tspan>
                    </text>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      );
    };
  },
});
</script>

<style>
.lifecycleChart {
  display: block;
  --opacity: 1;
}

.lifecycleChart.highlight {
  --opacity: 0.5;
}

.lifecycleChart rect,
.lifecycleChart text,
.lifecycleChart path {
  opacity: var(--opacity);
  transition: opacity 0.2s ease-in-out;
}

.lifecycleChart .trigger {
  cursor: default;
}

.lifecycleChart.highlight-init .pathInit,
.lifecycleChart.highlight-attached .pathAttached,
.lifecycleChart.highlight-removed .pathRemoved,
.lifecycleChart.highlight-update .pathUpdate {
  --opacity: 1;
}
</style>
