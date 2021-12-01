export default function example(x: number, y: number) {
	return x + y;
}

if(require.main === module) {
  console.log(`2 + 2 = ${example(2, 2)}`);
}
