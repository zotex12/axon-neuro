"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Projected from lat/long using a flat orthographic Natural Earth 50m transform:
// SVG y: 148-652 preserves the existing vertical footprint; x is cosine-corrected to remove lon/lat squash.
const locations = [
  { name: "Birmingham", cx: 252.8, cy: 502.7, labelX: -14, labelY: -2, anchor: "end" as const },
  { name: "Coventry", cx: 266.0, cy: 507.3, labelX: 14, labelY: 4, anchor: "start" as const },
  { name: "Warwickshire", cx: 263.7, cy: 515.5, labelX: 14, labelY: 18, anchor: "start" as const },
];

// Flat orthographic Great Britain mainland outline derived from Natural Earth 50m GeoJSON
const GB_PATH = "M223.6,154.7L223.7,159.5L223.4,160.9L222.7,162.7L220.4,166.0L214.6,170.7L203.8,181.5L197.3,186.8L196.4,189.4L195.9,193.0L199.6,193.9L201.1,195.1L200.1,196.9L194.3,203.3L192.5,209.1L196.8,208.9L200.4,207.9L207.6,204.4L214.3,201.8L217.5,201.8L223.7,204.1L225.1,204.1L227.7,203.1L230.4,203.0L248.5,203.7L253.5,202.5L256.8,204.0L259.6,207.7L262.4,214.7L262.3,215.8L260.7,219.0L257.7,223.0L255.2,228.5L254.4,231.4L254.0,234.6L253.1,237.6L248.0,251.7L242.9,259.4L240.7,265.0L237.8,269.4L235.1,272.1L232.2,273.9L223.9,275.8L221.6,277.2L218.8,279.5L215.8,280.7L219.3,280.6L222.7,279.3L228.8,278.8L235.9,283.6L235.2,287.4L232.4,290.3L225.8,290.8L219.6,297.4L216.9,299.4L213.9,300.4L210.3,300.0L203.7,298.2L200.8,296.2L203.4,299.3L206.3,300.9L223.6,305.0L224.6,304.6L230.1,300.7L237.5,300.7L251.4,308.0L255.5,313.6L261.3,321.5L264.5,324.6L266.8,327.4L268.3,331.6L271.1,345.7L274.4,359.3L278.7,374.1L280.7,378.2L283.2,381.1L296.0,387.5L298.9,389.6L303.9,395.9L308.8,402.6L313.4,407.7L318.3,411.8L316.0,414.1L314.5,417.5L315.9,422.2L317.9,426.7L322.1,433.7L325.7,441.5L324.4,440.3L323.1,439.7L321.2,440.0L319.4,439.6L316.1,437.3L312.9,434.4L306.6,435.7L303.2,435.2L300.1,435.4L305.9,437.0L312.2,437.0L326.4,449.7L331.3,457.4L334.5,467.5L332.7,472.2L329.8,475.3L327.1,478.8L324.6,482.8L332.6,488.2L334.3,488.1L336.0,487.2L337.6,485.1L340.2,480.4L341.6,478.7L346.4,477.9L350.5,478.1L354.6,478.9L358.2,478.5L365.4,480.2L369.2,481.8L378.7,489.5L380.9,493.9L382.1,499.7L382.6,506.1L381.3,512.0L379.8,517.4L379.1,524.3L378.4,526.8L377.4,528.8L372.7,534.4L369.5,536.8L368.1,535.9L366.6,536.1L366.5,537.4L368.2,540.1L368.4,543.4L365.5,546.0L362.6,547.2L357.6,546.1L350.8,550.9L355.9,553.1L357.0,555.6L356.0,560.1L352.9,562.1L349.4,563.1L345.8,563.5L342.9,564.7L340.1,566.8L343.7,565.6L346.2,566.5L347.9,570.1L349.3,571.2L356.4,572.4L360.7,572.2L369.0,570.9L373.0,570.8L374.5,571.4L374.7,574.5L374.4,582.1L373.4,583.6L362.5,590.5L360.4,595.0L359.9,597.7L353.3,597.6L350.3,600.5L345.1,602.6L341.1,604.7L337.1,607.4L333.8,608.2L319.5,605.7L310.9,606.1L299.2,609.0L296.2,608.6L291.6,606.2L287.0,604.6L281.7,603.8L277.1,601.6L280.0,606.1L273.7,610.4L270.7,611.3L267.7,611.2L261.5,612.3L255.7,611.7L256.5,614.9L258.1,617.5L256.9,618.7L255.5,619.0L244.5,617.0L243.0,617.4L241.6,619.2L237.6,618.1L233.7,615.0L229.5,612.9L225.2,611.8L221.8,612.2L207.5,616.9L204.6,621.8L203.1,628.8L200.9,635.0L197.4,639.7L193.4,640.2L189.7,636.9L182.6,633.0L180.3,630.5L179.5,630.3L178.7,631.2L175.8,632.2L172.9,632.2L168.4,633.1L160.5,635.7L157.3,637.6L150.3,643.0L148.8,644.4L146.2,650.0L142.3,650.8L139.0,647.0L135.1,645.7L130.9,646.7L128.4,648.5L127.2,646.9L127.4,643.7L130.6,640.1L138.7,637.5L146.1,630.4L149.7,625.9L151.2,623.4L152.9,621.9L155.2,621.3L156.4,618.5L166.5,607.5L167.4,604.9L168.0,600.2L168.9,595.7L176.9,593.1L180.9,583.7L181.9,583.0L193.0,581.5L201.0,581.9L209.1,583.8L213.2,584.1L217.4,583.4L220.7,581.0L226.3,571.8L229.4,567.8L233.0,564.2L236.4,560.0L241.8,552.3L238.1,554.9L233.7,559.1L231.2,561.6L223.0,564.0L219.5,566.5L213.2,572.1L212.1,572.5L202.8,571.1L196.1,563.5L191.7,560.4L189.9,559.9L188.0,560.8L184.0,561.7L179.9,561.4L182.1,558.0L184.9,556.2L178.6,554.7L176.9,553.6L175.0,551.2L170.0,550.6L167.6,551.2L163.5,554.2L157.1,557.3L149.6,552.3L148.2,550.3L148.4,546.3L147.4,543.1L145.3,541.9L148.2,538.0L151.5,535.4L158.8,533.0L169.7,526.9L175.8,524.4L181.5,519.8L183.9,517.1L185.7,513.2L187.5,508.4L189.9,504.6L187.7,503.6L186.7,500.7L187.1,497.6L188.2,495.0L187.3,491.6L185.7,488.2L185.9,485.5L186.4,482.5L182.2,482.6L177.9,483.4L174.0,485.3L170.2,488.0L166.8,488.4L167.0,486.2L168.5,483.4L172.4,479.6L176.5,476.5L178.0,474.1L179.2,471.2L181.2,468.9L186.6,464.8L196.6,460.1L198.1,459.8L202.0,460.5L205.9,459.7L209.3,458.1L212.6,457.7L220.1,463.0L218.0,455.0L221.3,453.2L226.1,460.3L227.9,461.1L231.6,460.2L230.2,459.0L228.5,458.8L226.3,457.7L224.4,455.4L221.4,448.1L221.6,443.8L223.7,439.4L226.1,435.3L224.1,434.5L222.6,432.8L222.2,428.7L222.9,425.1L227.0,421.9L228.3,417.0L228.9,411.7L228.2,409.2L224.1,409.5L222.1,410.5L220.3,412.1L218.5,412.0L213.6,406.0L210.8,401.5L205.8,391.8L205.2,386.2L209.5,374.0L215.9,366.3L223.3,363.6L221.8,363.0L210.7,362.8L206.9,363.7L203.5,366.9L201.5,367.8L199.5,368.1L197.6,369.7L195.7,371.8L193.8,373.2L190.0,372.7L188.2,373.1L186.9,371.8L185.9,369.7L184.5,369.1L182.8,369.7L179.4,372.5L175.9,374.0L171.9,372.1L166.5,368.6L165.4,369.7L164.1,372.8L163.2,377.6L159.5,373.3L156.5,367.5L155.5,363.9L155.6,359.9L157.4,358.5L159.3,359.9L162.5,350.6L168.6,338.4L170.8,334.9L172.3,330.3L172.2,327.2L171.0,324.5L166.0,318.4L166.2,313.6L167.0,308.2L168.5,305.0L169.2,304.4L176.1,304.7L173.4,303.0L168.2,297.9L168.4,296.1L169.8,291.6L169.2,292.1L168.0,294.2L165.6,299.1L164.2,300.3L160.4,301.3L159.7,303.8L159.0,304.4L157.1,304.6L156.4,306.9L156.0,307.1L155.5,304.6L155.7,300.3L156.6,296.5L158.2,293.6L164.0,287.0L161.2,289.0L154.8,295.1L151.5,299.1L150.6,300.4L150.3,301.6L150.3,302.9L151.4,310.3L150.8,313.7L144.5,335.8L143.4,337.9L142.4,339.1L141.5,339.3L138.9,338.7L137.8,337.1L137.9,335.2L138.5,332.3L141.2,321.8L142.3,319.0L143.9,316.2L147.2,311.6L147.2,311.3L145.1,312.1L144.2,311.8L143.6,310.9L144.7,296.6L146.6,292.1L147.5,285.3L149.2,279.5L151.1,275.4L152.5,270.0L154.5,267.7L155.2,264.0L157.5,260.2L159.3,256.0L158.4,256.4L147.4,266.8L144.7,268.7L141.0,268.0L138.3,266.6L136.2,263.9L135.5,259.0L132.8,258.6L130.6,257.7L130.7,257.0L133.8,254.5L138.5,253.8L143.2,249.8L139.4,246.7L139.8,245.7L143.3,243.5L148.1,235.3L149.3,227.7L147.4,224.0L146.8,221.7L142.8,218.9L142.3,215.4L142.9,213.7L144.3,211.8L146.4,210.5L149.6,209.4L146.8,207.7L145.8,206.0L145.1,203.4L145.1,202.0L146.9,195.6L147.9,193.0L149.8,189.7L157.4,190.2L158.3,188.7L159.2,188.8L163.0,190.2L162.5,188.8L156.5,180.5L156.0,178.9L158.0,174.7L158.2,172.8L158.0,170.6L158.6,169.2L160.6,168.4L166.7,168.8L168.2,168.1L167.6,166.0L166.4,163.2L166.1,160.9L166.6,158.8L166.8,154.7L167.2,152.9L168.7,150.3L169.9,149.5L171.4,149.2L174.7,150.2L175.9,151.4L177.3,153.9L178.4,153.7L182.5,151.1L183.8,150.7L185.4,154.1L192.5,151.7L202.1,150.7L207.8,149.1L213.7,148.6L219.4,146.8L225.3,147.7L225.5,148.9L225.1,150.4L223.6,154.7Z";

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
    <section className="py-16 sm:py-24 md:py-32 bg-brand-50/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2
            ref={headingRef}
            className={`heading-underline text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 ${
              underlineActive ? "active" : ""
            }`}
          >
            Find Local Support
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            We&apos;re building a network of rehabilitation support workers across England.
          </p>
        </motion.div>

        <div ref={ref} className="relative max-w-[280px] sm:max-w-sm mx-auto">
          {/* Flat UK mainland outline, derived from Natural Earth 50m data */}
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
              strokeWidth="2"
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

            {/* Location dots — larger touch-friendly radius on mobile via thicker stroke */}
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
                  strokeWidth="2"
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
                  x={loc.cx + loc.labelX}
                  y={loc.cy + loc.labelY}
                  fill="#055000"
                  fontSize="11"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="500"
                  textAnchor={loc.anchor}
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
            className="absolute top-4 right-0 sm:top-6 sm:right-6"
          >
            <div className="relative">
              <span className="inline-block bg-brand text-white text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
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
