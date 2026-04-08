"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Natural Earth 50m projected coordinates — calibrated to viewBox 0 0 500 800
// Birmingham ~52.48°N 1.89°W, Coventry ~52.41°N 1.51°W, Warwickshire ~52.3°N 1.57°W
const locations = [
  { name: "Birmingham", cx: 195, cy: 465 },
  { name: "Coventry", cx: 215, cy: 470 },
  { name: "Warwickshire", cx: 208, cy: 455 },
];

// Accurate Great Britain mainland outline extracted from Natural Earth 50m GeoJSON
const GB_PATH = "M196.5,156.0L197.0,160.8L196.3,162.2L194.9,164.0L190.5,167.3L178.9,172.1L157.7,183.1L145.1,188.5L143.4,191.1L142.5,194.7L150.0,195.5L152.9,196.7L151.1,198.5L140.0,205.0L136.7,210.8L145.2,210.5L152.2,209.4L166.3,205.8L179.4,203.1L185.7,203.0L198.0,205.2L200.8,205.2L206.0,204.2L211.3,204.1L247.0,204.7L257.0,203.5L263.5,205.0L269.0,208.7L274.3,215.7L274.1,216.8L270.9,220.0L265.1,223.9L260.1,229.4L258.6,232.3L257.7,235.5L256.1,238.5L246.1,252.5L236.4,260.2L232.1,265.7L226.7,270.1L221.5,272.8L216.0,274.7L200.2,276.6L195.7,278.0L190.4,280.4L184.8,281.6L191.4,281.5L197.8,280.1L209.6,279.6L223.2,284.3L221.9,288.1L216.5,291.0L204.1,291.5L192.5,298.2L187.3,300.2L181.8,301.2L174.9,300.9L162.3,299.2L156.9,297.3L161.8,300.3L167.4,301.9L200.1,305.7L202.0,305.3L212.4,301.3L226.3,301.3L252.7,308.5L260.3,314.1L271.2,322.0L277.1,325.1L281.4,327.9L284.1,332.1L289.2,346.1L295.0,359.7L302.6,374.4L306.1,378.5L310.7,381.4L333.7,388.0L338.9,390.2L347.8,396.5L356.4,403.3L364.5,408.5L373.1,412.7L368.9,414.9L366.0,418.3L368.2,423.0L371.7,427.5L378.7,434.6L384.8,442.4L382.5,441.2L380.2,440.6L376.9,440.8L373.7,440.4L367.9,438.0L362.3,435.0L351.1,436.2L344.9,435.6L339.5,435.7L349.7,437.4L360.9,437.6L385.5,450.6L393.9,458.4L398.8,468.6L395.4,473.2L390.2,476.2L385.3,479.6L380.7,483.5L394.4,489.1L397.3,489.0L400.3,488.2L403.2,486.2L408.1,481.6L410.7,479.9L419.2,479.3L426.3,479.7L433.4,480.7L439.7,480.4L452.3,482.4L458.7,484.2L474.8,492.3L478.2,496.8L479.8,502.6L480.0,509.0L477.3,514.8L474.2,520.1L472.3,526.9L470.9,529.4L469.0,531.3L460.6,536.6L454.9,538.9L452.5,537.9L450.0,538.0L449.7,539.3L452.4,542.1L452.4,545.4L447.4,547.8L442.3,548.9L433.8,547.6L422.0,552.1L430.5,554.5L432.2,557.0L430.1,561.4L424.7,563.3L418.8,564.2L412.7,564.4L407.7,565.5L402.8,567.5L408.9,566.4L413.1,567.4L415.7,571.1L418.1,572.2L430.0,573.7L437.3,573.7L451.4,572.8L458.2,572.8L460.6,573.5L460.7,576.6L459.6,584.1L457.8,585.6L439.0,592.0L435.2,596.4L434.1,599.0L423.1,598.6L418.0,601.4L409.1,603.3L402.3,605.3L395.5,607.8L390.0,608.5L366.1,605.6L351.7,605.8L332.2,608.4L327.2,608.0L319.6,605.5L311.9,603.8L303.0,603.0L295.4,600.7L300.1,605.2L289.5,609.5L284.6,610.3L279.5,610.2L269.1,611.3L259.5,610.7L260.9,613.8L263.5,616.4L261.4,617.6L259.2,617.9L240.9,615.9L238.3,616.3L236.0,618.1L229.3,617.1L222.8,614.0L215.9,611.9L208.7,610.9L203.0,611.3L179.3,616.2L174.6,621.1L172.2,628.1L168.8,634.3L163.2,639.1L156.6,639.7L150.4,636.4L138.5,632.7L134.5,630.3L133.2,630.1L131.9,631.0L127.2,632.1L122.4,632.2L115.0,633.2L102.1,636.1L96.8,638.1L85.6,643.7L83.3,645.2L79.3,650.9L73.0,651.8L67.3,648.2L60.8,647.0L54.0,648.2L49.9,650.1L47.9,648.6L47.9,645.4L52.9,641.6L66.2,638.7L77.9,631.3L83.6,626.7L85.9,624.2L88.7,622.6L92.4,621.9L94.3,619.1L110.5,607.8L111.9,605.2L112.7,600.5L114.0,596.0L127.2,593.1L133.6,583.7L135.3,583.0L153.8,581.2L167.4,581.4L181.0,583.2L188.0,583.4L195.0,582.7L200.5,580.2L209.9,571.0L215.1,567.0L221.2,563.4L226.8,559.2L236.0,551.5L229.8,554.1L222.3,558.3L218.0,560.8L204.2,563.3L198.2,565.8L187.8,571.5L185.8,571.9L170.1,570.6L158.4,563.2L150.9,560.2L147.8,559.8L144.6,560.7L137.8,561.7L130.9,561.5L134.4,558.1L139.2,556.2L128.4,554.9L125.4,553.8L122.0,551.5L113.5,551.1L109.5,551.7L102.7,554.8L91.9,558.2L78.9,553.5L76.3,551.5L76.4,547.5L74.5,544.4L70.9,543.3L75.5,539.3L81.0,536.6L93.3,533.9L111.8,527.5L122.2,524.8L131.8,520.1L135.8,517.3L138.7,513.4L141.6,508.6L145.7,504.7L141.7,503.8L139.9,500.9L140.4,497.9L142.3,495.2L140.6,491.9L137.7,488.5L137.9,485.8L138.6,482.9L131.2,483.1L123.7,484.0L117.0,486.0L110.5,488.8L104.7,489.3L104.8,487.1L107.3,484.3L113.9,480.4L120.9,477.2L123.4,474.7L125.4,471.8L128.9,469.5L138.1,465.2L155.7,460.3L158.3,460.0L165.2,460.6L172.0,459.8L178.0,458.1L183.9,457.7L197.2,462.8L193.3,454.9L199.1,453.1L207.7,460.1L210.9,460.9L217.5,459.9L215.0,458.7L211.9,458.6L208.0,457.5L204.7,455.2L199.2,448.0L199.5,443.7L203.2,439.3L207.3,435.2L203.8,434.4L201.1,432.8L200.3,428.7L201.4,425.1L208.8,421.9L211.0,417.0L211.9,411.7L210.7,409.2L203.3,409.6L199.7,410.6L196.5,412.2L193.2,412.1L184.2,406.2L179.0,401.8L169.7,392.3L168.4,386.7L175.8,374.5L187.3,366.7L200.8,364.0L198.2,363.4L177.6,363.3L170.8,364.3L164.5,367.5L160.9,368.5L157.2,368.8L153.8,370.4L150.5,372.6L147.0,374.0L140.1,373.6L136.8,374.1L134.4,372.8L132.4,370.7L129.8,370.2L126.8,370.8L120.6,373.7L114.3,375.3L106.8,373.5L96.8,370.2L94.8,371.4L92.6,374.5L91.4,379.3L84.3,375.2L78.3,369.5L76.2,366.0L76.1,362.0L79.4,360.5L82.9,361.9L88.2,352.5L98.7,340.2L102.5,336.6L105.0,332.0L104.6,328.9L102.3,326.3L92.5,320.4L92.6,315.6L93.7,310.2L96.3,307.0L97.5,306.3L110.5,306.4L105.4,304.8L95.3,299.9L95.5,298.1L97.8,293.6L96.7,294.1L94.6,296.2L90.4,301.2L87.9,302.4L80.8,303.6L79.5,306.1L78.3,306.7L74.7,307.0L73.7,309.3L72.9,309.5L71.8,307.0L71.7,302.8L73.2,299.0L75.9,296.0L86.4,289.2L81.3,291.3L69.7,297.6L63.8,301.7L62.2,303.1L61.7,304.3L61.8,305.6L64.4,312.9L63.7,316.3L53.7,338.5L51.8,340.7L50.1,341.9L48.4,342.1L43.5,341.7L41.3,340.1L41.4,338.2L42.3,335.3L46.4,324.8L48.2,321.9L50.9,319.1L56.7,314.4L56.6,314.1L52.7,315.0L51.0,314.7L49.8,313.8L50.6,299.6L53.8,295.0L55.0,288.2L57.7,282.4L60.9,278.2L63.3,272.8L66.9,270.4L67.9,266.7L72.0,262.8L75.2,258.6L73.5,259.0L53.2,269.8L48.1,271.8L41.1,271.3L35.7,270.1L31.5,267.5L29.6,262.6L24.4,262.4L20.0,261.6L20.1,260.9L25.8,258.3L34.9,257.3L43.5,253.1L35.9,250.2L36.5,249.2L43.2,246.8L51.7,238.5L53.4,230.9L49.3,227.3L47.9,225.0L39.8,222.4L38.4,219.0L39.4,217.2L42.0,215.3L46.0,213.9L52.2,212.6L46.6,211.1L44.4,209.4L42.8,206.9L42.7,205.5L45.6,199.0L47.3,196.4L50.7,193.0L65.8,193.2L67.5,191.7L69.3,191.7L77.0,193.0L75.9,191.6L63.2,183.6L62.1,182.0L65.7,177.7L65.9,175.8L65.4,173.7L66.4,172.2L70.4,171.4L82.7,171.5L85.7,170.8L84.3,168.7L81.5,166.0L80.9,163.7L81.6,161.6L81.7,157.5L82.3,155.7L85.2,153.0L87.6,152.2L90.6,151.8L97.3,152.7L99.9,153.8L102.8,156.3L105.0,156.1L113.3,153.3L115.8,152.9L119.3,156.2L133.5,153.6L152.8,152.4L164.3,150.7L176.4,150.1L187.8,148.2L199.8,149.0L200.2,150.2L199.6,151.7L196.5,156.0Z";

export default function MapPlaceholder() {
  const ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const headingInView = useInView(headingRef, { once: true, margin: "-50px" });
  const [underlineActive, setUnderlineActive] = useState(false);

  useEffect(() => {
    if (headingInView) {
      const timer = setTimeout(() => setUnderlineActive(true), 300);
      return () => clearTimeout(timer);
    }
  }, [headingInView]);

  return (
    <section className="py-24 sm:py-32 bg-brand-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            ref={headingRef}
            className={`heading-underline text-3xl sm:text-4xl font-bold text-gray-900 ${
              underlineActive ? "active" : ""
            }`}
          >
            Find Local Support
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
            We&apos;re building a network of rehabilitation support workers across England.
          </p>
        </motion.div>

        <div ref={ref} className="relative max-w-sm mx-auto">
          {/* Accurate UK mainland outline — Natural Earth 50m data */}
          <motion.svg
            viewBox="0 0 500 800"
            className="w-full h-auto"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Light fill for land area */}
            <path
              d={GB_PATH}
              fill="#f0fdf0"
              stroke="none"
            />

            {/* Animated outline stroke */}
            <motion.path
              d={GB_PATH}
              fill="none"
              stroke="#055000"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 3, ease: "easeOut" },
                },
              }}
            />

            {/* Location dots */}
            {locations.map((loc, i) => (
              <g key={loc.name}>
                <motion.circle
                  cx={loc.cx}
                  cy={loc.cy}
                  r="5"
                  fill="#055000"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 2.5 + i * 0.2,
                  }}
                />
                {/* Pulse ring */}
                <motion.circle
                  cx={loc.cx}
                  cy={loc.cy}
                  r="5"
                  fill="none"
                  stroke="#055000"
                  strokeWidth="1.5"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={
                    isInView
                      ? {
                          scale: [1, 3],
                          opacity: [0.5, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 3 + i * 0.3,
                    ease: "easeOut",
                  }}
                />
                <motion.text
                  x={loc.cx + 10}
                  y={loc.cy + 4}
                  fill="#055000"
                  fontSize="12"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="500"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 3 + i * 0.2 }}
                >
                  {loc.name}
                </motion.text>
              </g>
            ))}
          </motion.svg>

          {/* Coming Soon badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 150, delay: 3.5 }}
            className="absolute top-6 right-6"
          >
            <div className="relative">
              <span className="inline-block bg-brand text-white text-xs font-semibold px-4 py-2 rounded-full">
                Coming Soon
              </span>
              <span className="absolute inset-0 bg-brand rounded-full animate-ping opacity-20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
