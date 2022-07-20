import { dev } from '$app/env'
import { globalObject } from '../globalObject'
import TestContainer from './TestContainer'
import { ProductionContainer } from './ProductionContainer'

globalObject.container = dev ? new TestContainer() : new ProductionContainer()
