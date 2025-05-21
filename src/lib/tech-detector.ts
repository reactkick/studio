export function detectTechStack(content: string): string {
  if (!content || content.trim() === "") return "N/A";

  const lowerContent = content.toLowerCase();

  // More specific checks first
  if (lowerContent.includes('@angular/core') || lowerContent.includes('angular.module') || /@Component\s*\(/.test(content)) {
    return "Angular";
  }
  if (lowerContent.includes("from 'react'") || lowerContent.includes('require("react")') || lowerContent.includes('reactdom.render') || /import\s*{\s*(useState|useEffect|Component)\s*}\s*from\s*['"]react['"]/.test(content)) {
    return "React";
  }
  if (lowerContent.includes("from 'vue'") || lowerContent.includes('new vue({') || /import\s*{\s*(createApp|defineComponent)\s*}\s*from\s*['"]vue['"]/.test(content)) {
    return "Vue.js";
  }
  if (lowerContent.includes("from 'svelte'") || (lowerContent.includes('<script') && lowerContent.includes('export let'))) {
    if (lowerContent.includes("svelte/internal") || lowerContent.includes("$:")) return "Svelte";
  }
  if (lowerContent.includes("package main") && lowerContent.includes("func main()") && (lowerContent.includes("fmt.print") || lowerContent.includes("log.print"))) {
    return "Go";
  }
  if (lowerContent.includes("public static void main") && lowerContent.includes("class ") && (lowerContent.includes("system.out.print") || lowerContent.includes("public class"))) {
    return "Java";
  }
  if (lowerContent.includes("def ") && lowerContent.includes(":") && (lowerContent.includes("import ") || lowerContent.includes("print("))) {
    // Python can be tricky, check for common imports or structure
    if (lowerContent.includes("django") || lowerContent.includes("flask")) return "Python (Web Framework)";
    return "Python";
  }
  if (lowerContent.includes("using system;") && lowerContent.includes("namespace ") && lowerContent.includes("class ") && lowerContent.includes("static void main")) {
    return "C#";
  }
  if (lowerContent.includes("#include <iostream>") || (lowerContent.includes("int main()") && lowerContent.includes("std::cout"))) {
    return "C++";
  }
   if (lowerContent.includes("fn main()") && (lowerContent.includes("println!(") || lowerContent.includes("use std::"))) {
    return "Rust";
  }
  if (lowerContent.includes("import uikit") || lowerContent.includes("import swiftui") || (lowerContent.includes("func ") && !lowerContent.includes("function ") && lowerContent.includes("print(")) ) {
    return "Swift";
  }
  if (lowerContent.includes("<?php")) {
    return "PHP";
  }
  if (lowerContent.includes("module.exports") || lowerContent.includes("require(") && (lowerContent.includes("http.createserver") || lowerContent.includes("express()"))){
    return "Node.js";
  }
  // Broader checks
  if (lowerContent.includes("def ") && lowerContent.includes("end") && (lowerContent.includes("puts") || lowerContent.includes("require "))) {
    return "Ruby";
  }
  if (lowerContent.includes("<!doctype html>") || lowerContent.includes("<html>")) {
    if (lowerContent.includes("<script") && (lowerContent.includes("function") || lowerContent.includes("const") || lowerContent.includes("let"))) {
      return "HTML/JavaScript";
    }
    return "HTML";
  }
  if (lowerContent.includes("function ") || lowerContent.includes("const ") || lowerContent.includes("let ") || lowerContent.includes("var ")) {
    return "JavaScript";
  }
  if (/[a-zA-Z-]+\s*:\s*[^;]+;/.test(content) && /{[^}]*}/.test(content)) {
     // Basic CSS property check
    if (lowerContent.includes("color:") || lowerContent.includes("font-size:") || lowerContent.includes("background:")) {
        return "CSS";
    }
  }

  return "Undetermined";
}
